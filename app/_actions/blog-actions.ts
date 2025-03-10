"use server";

import { prisma } from "@/lib/db";
import { makeSlug } from "@/lib/utils";
import { deleteImage, uploadImage } from "./image-actions";
import { cache } from "react";
import { revalidatePath } from "next/cache";

export const createBlog = async (formData: FormData) => {
  const imageFile = formData.get("imageFile") as File | null;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const tags = formData.get("tags") as string;

  if (!imageFile) return { error: "No file uploaded" };
  if (!title || !content || !tags) return { error: "All fields are required" };

  try {
    const slug = makeSlug(title);

    // Upload image
    const { error, imageId } = await uploadImage(imageFile);
    if (error || !imageId) return { error: "Image upload failed" };

    // Handle tags efficiently with a transaction
    const tagNames = tags.split(",").map((t) => t.trim());

    const tagUpserts = tagNames.map((name) =>
      prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name, slug: makeSlug(name) },
      })
    );

    const existingTags = await prisma.$transaction(tagUpserts);

    // Create blog
    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        content,
        description,
        imageId,
        slug,
        tags: {
          connect: existingTags.map((tag) => ({ id: tag.id })),
        },
      },
    });

    revalidatePath("/dashboard/blog");
    revalidatePath("/blog");
    revalidatePath("/");

    return { success: `${blogPost.title} created successfully`, blogPost };
  } catch (error) {
    console.error("Error creating blog:", error);
    return { error: "An error occurred while creating the blog" };
  }
};

export const getPaginatedBlog = cache(async (page = 1, pageSize = 4) => {
  const MAX_PAGE_SIZE = 20; // Set an upper limit for page size

  // Ensure valid pagination inputs
  const currentPage = Math.max(1, page);
  const validPageSize = Math.min(Math.max(1, pageSize), MAX_PAGE_SIZE);
  const skip = (currentPage - 1) * validPageSize;

  try {
    // Fetch paginated blogPosts and total count in parallel
    const [blogPosts, total] = await prisma.$transaction([
      prisma.blogPost.findMany({
        skip,
        take: validPageSize,
        orderBy: { publishedAt: "desc" },
        include: { tags: true, thumbnail: true },
        where: {
          isPublished: true,
        },
      }),
      prisma.blogPost.count(),
    ]);

    return {
      blogPosts,
      pagination: {
        currentPage,
        totalPages: Math.ceil(total / validPageSize),
        pageSize: validPageSize,
        total,
      },
    };
  } catch (error) {
    console.error("Error fetching paginated blog posts:", error);
    return {
      error:
        "An error occurred while fetching blog posts. Please try again later.",
    };
  }
});

export const deleteBlog = async (slug: string) => {
  try {
    // Fetch blog with related data
    const blogPost = await prisma.blogPost.findUnique({
      where: { slug },
      include: { tags: true }, // Include related data if needed
    });

    if (!blogPost) {
      return { error: "Blog not found" };
    }

    // Delete associated image (if applicable)
    if (blogPost.imageId) {
      const imageDeleteResult = await deleteImage(blogPost.imageId);
      if (imageDeleteResult.error) {
        return { error: "Failed to delete blog image." };
      }
    }

    // Delete blog safely
    await prisma.blogPost.delete({
      where: { slug },
    });

    revalidatePath("/dashboard/blog");
    revalidatePath("/blog");
    revalidatePath("/");

    return { message: "Blog deleted successfully" };
  } catch (error: unknown) {
    console.error("Error deleting blog post:", error);
    if (error instanceof Error) {
      return { error: `Failed to delete blog: ${error.message}` };
    }
    return { error: "Failed to delete blog: An unknown error occurred" };
  }
};

export const editBlog = async (formData: FormData) => {
  const imageFile = formData.get("imageFile") as File | null;
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const tags = formData.get("tags") as string;

  try {
    const slug = makeSlug(title);

    // Validate that the blog exists
    const blogPost = await prisma.blogPost.findUnique({ where: { id } });
    if (!blogPost) return { error: "Blog post not found" };

    let newImageId = blogPost.imageId; // Keep existing image if no new one is provided

    if (imageFile) {
      const { error, imageId } = await uploadImage(imageFile);
      if (error || !imageId) return { error: "Image upload failed" };

      await deleteImage(blogPost.imageId); // Delete only after successful upload
      newImageId = imageId;
    }

    // Handle tags efficiently using a transaction
    let tagData;
    if (tags) {
      const tagNames = tags.split(",").map((t) => t.trim());

      const upsertOperations = tagNames.map((name) =>
        prisma.tag.upsert({
          where: { name },
          update: {},
          create: { name, slug: makeSlug(name) },
        })
      );

      const existingTags = await prisma.$transaction(upsertOperations);
      tagData = {
        set: existingTags.map((tag) => ({ id: tag.id })),
      };
    }

    // Dynamically construct updatedData object
    const updatedData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(content && { content: content }),
      ...(newImageId && { imageId: newImageId }),
      ...(slug && { slug }),
      ...(tagData && { tags: tagData }),
    };

    // Update the blog
    const updatedBlog = await prisma.blogPost.update({
      where: { id },
      data: updatedData,
    });

    revalidatePath(`/blog/${slug}`);
    revalidatePath("/dashboard/blog");
    revalidatePath("/blog");
    revalidatePath("/");

    return { message: "Blog updated successfully", updatedBlog };
  } catch (error) {
    console.error("Error updating blog:", error);
    return { error: "An unexpected error occurred while updating the blog" };
  }
};

export const getPublishedBlogById = cache(async (id: string) => {
  try {
    const blogPost = await prisma.blogPost.findFirst({
      where: { id, isPublished: true }, // Ensure it's published
      include: { tags: true, thumbnail: true },
    });

    if (!blogPost) return { error: "Blog post not found or unpublished" };

    return { blogPost };
  } catch (error) {
    console.error("Error fetching published blog by ID:", error);
    return { error: "An error occurred while retrieving the blog post." };
  }
});

export const getBlogByTag = cache(
  async (tagName: string, page = 1, pageSize = 4) => {
    const skip = (page - 1) * pageSize;

    try {
      const [blogPost, total] = await prisma.$transaction([
        prisma.blogPost.findMany({
          where: {
            tags: {
              some: { name: { equals: tagName, mode: "insensitive" } },
            },
          },
          skip,
          take: pageSize,
          orderBy: { publishedAt: "desc" },
          include: { tags: true },
        }),
        prisma.blogPost.count({
          where: {
            tags: {
              some: { name: { equals: tagName, mode: "insensitive" } },
            },
          },
        }),
      ]);

      return {
        blogPost,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / pageSize),
          total,
        },
      };
    } catch (error) {
      console.error("Error fetching blogs by technology:", error);
      return { error: "An error occurred while fetching blogs" };
    }
  }
);
export const getBlogBySlug = cache(async (slug: string) => {
  try {
    const blogPost = await prisma.blogPost.findUnique({
      where: { slug }, // Find by slug first
      include: { tags: true, thumbnail: true },
    });

    // Ensure blog post exists and is published
    if (!blogPost || !blogPost.isPublished) {
      return { error: "Blog not found or unpublished" };
    }

    return { blogPost };
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return { error: "An error occurred while fetching the blog" };
  }
});

export const getRelatedBlog = cache(async (slug: string, limit = 4) => {
  try {
    // Get the blog's tags
    const blogPost = await prisma.blogPost.findUnique({
      where: { slug },
      include: { tags: { select: { id: true } } },
    });

    if (!blogPost) return { error: "Blog not found" };
    if (!blogPost.tags.length) return { error: "No related blogs found" };

    // Fetch related blogs that share at least one tag and are published
    const relatedBlogs = await prisma.blogPost.findMany({
      where: {
        slug: { not: slug }, // Exclude the current blog
        isPublished: true, // Only fetch published blogs
        tags: {
          some: {
            id: { in: blogPost.tags.map((tag) => tag.id) },
          },
        },
      },
      take: limit,
      orderBy: { publishedAt: "desc" },
      include: { tags: true, thumbnail: true },
    });

    if (!relatedBlogs.length) return { error: "No related blogs found" };

    return { relatedBlogs };
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    return { error: "An error occurred while fetching related blogs" };
  }
});

export const publishBlogPost = async (id: string) => {
  try {
    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        isPublished: true,
        publishedAt: new Date(), // Set publishedAt to current time
      },
    });

    return {
      success: true,
      message: "Blog post published successfully",
      blogPost: updatedPost,
    };
  } catch (error) {
    console.error("Error publishing blog post:", error);
    return {
      success: false,
      error: "Failed to publish blog post. Please try again.",
    };
  }
};

export const unpublishBlogPost = async (id: string) => {
  try {
    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        isPublished: false,
        publishedAt: null, // Reset published date
      },
    });

    return {
      success: true,
      message: "Blog post unpublished successfully",
      blogPost: updatedPost,
    };
  } catch (error) {
    console.error("Error unpublishing blog post:", error);
    return {
      success: false,
      error: "Failed to unpublish blog post. Please try again.",
    };
  }
};

// Fetch all blog posts for admin with pagination (includes both published and unpublished posts)
export const getAllPostsAdmin = cache(async (page = 1, pageSize = 10) => {
  const MAX_PAGE_SIZE = 20; // Optional: Set an upper limit for page size

  // Ensure valid pagination inputs
  const currentPage = Math.max(1, page);
  const validPageSize = Math.min(Math.max(1, pageSize), MAX_PAGE_SIZE);
  const skip = (currentPage - 1) * validPageSize;

  try {
    // Fetch paginated blogPosts and total count in parallel
    const [blogPosts, total] = await prisma.$transaction([
      prisma.blogPost.findMany({
        skip,
        take: validPageSize,
        orderBy: { publishedAt: "desc" },
        include: { tags: true, thumbnail: true, user: true },
      }),
      prisma.blogPost.count(),
    ]);

    return {
      blogPosts,
      pagination: {
        currentPage,
        totalPages: Math.ceil(total / validPageSize),
        pageSize: validPageSize,
        total,
      },
    };
  } catch (error) {
    console.error("Error fetching all posts for admin:", error);
    return { error: "An error occurred while fetching all posts." };
  }
});

// Fetch a single blog post by ID for admin
export const getPostByIdAdmin = cache(async (id: string) => {
  try {
    const blogPost = await prisma.blogPost.findUnique({
      where: { id },
      include: { tags: true, thumbnail: true, user: true },
    });

    if (!blogPost) return { error: "Blog post not found" };

    return { blogPost };
  } catch (error) {
    console.error("Error fetching blog post by ID for admin:", error);
    return { error: "An error occurred while fetching the blog post." };
  }
});

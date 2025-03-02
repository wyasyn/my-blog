"use server";

import { prisma } from "@/lib/db";
import { makeSlug } from "@/lib/utils";
import { deleteImage, uploadImage } from "./image-actions";
import { cache } from "react";

export const createProject = async (formData: FormData) => {
  const imageFile = formData.get("imageFile") as File | null;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const technologies = formData.get("technologies") as string;

  if (!imageFile) return { error: "No file uploaded" };
  if (!title || !description || !technologies)
    return { error: "All fields are required" };

  try {
    const slug = makeSlug(title);

    // Upload image
    const { error, imageId } = await uploadImage(imageFile);
    if (error || !imageId) return { error: "Image upload failed" };

    // Handle technologies efficiently with a transaction
    const techNames = technologies.split(",").map((t) => t.trim());

    const techUpserts = techNames.map((name) =>
      prisma.technology.upsert({
        where: { name },
        update: {},
        create: { name, slug: makeSlug(name) },
      })
    );

    const existingTechnologies = await prisma.$transaction(techUpserts);

    // Create project
    const project = await prisma.project.create({
      data: {
        title,
        content: description,
        imageId,
        slug,
        technologies: {
          connect: existingTechnologies.map((tech) => ({ id: tech.id })),
        },
      },
    });

    return { success: `${project.title} created successfully`, project };
  } catch (error) {
    console.error("Error creating project:", error);
    return { error: "An error occurred while creating the project" };
  }
};

export const getPaginatedProjects = cache(async (page = 1, pageSize = 4) => {
  const MAX_PAGE_SIZE = 20; // Set an upper limit for page size

  // Ensure valid pagination inputs
  const currentPage = Math.max(1, page);
  const validPageSize = Math.min(Math.max(1, pageSize), MAX_PAGE_SIZE);
  const skip = (currentPage - 1) * validPageSize;

  try {
    // Fetch paginated projects and total count in parallel
    const [projects, total] = await prisma.$transaction([
      prisma.project.findMany({
        skip,
        take: validPageSize,
        orderBy: { createdAt: "desc" },
        include: { technologies: true, thumbnail: true },
      }),
      prisma.project.count(),
    ]);

    return {
      projects,
      pagination: {
        currentPage,
        totalPages: Math.ceil(total / validPageSize),
        pageSize: validPageSize,
        total,
      },
    };
  } catch (error) {
    console.error("Error fetching paginated projects:", error);
    return {
      error:
        "An error occurred while fetching projects. Please try again later.",
    };
  }
});

export const deleteProject = async (slug: string) => {
  try {
    // Fetch project with related data
    const project = await prisma.project.findUnique({
      where: { slug },
      include: { technologies: true }, // Include related data if needed
    });

    if (!project) {
      return { error: "Project not found" };
    }

    // Delete associated image (if applicable)
    if (project.imageId) {
      const imageDeleteResult = await deleteImage(project.imageId);
      if (imageDeleteResult.error) {
        return { error: "Failed to delete project image." };
      }
    }

    // Delete project safely
    await prisma.project.delete({
      where: { slug },
    });

    return { message: "Project deleted successfully" };
  } catch (error: unknown) {
    console.error("Error deleting project:", error);
    if (error instanceof Error) {
      return { error: `Failed to delete project: ${error.message}` };
    }
    return { error: "Failed to delete project: An unknown error occurred" };
  }
};

export const editProject = async (formData: FormData) => {
  const imageFile = formData.get("imageFile") as File | null;
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const technologies = formData.get("technologies") as string;

  try {
    const slug = makeSlug(title);

    // Validate that the project exists
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return { error: "Project not found" };

    let newImageId = project.imageId; // Keep existing image if no new one is provided

    if (imageFile) {
      const { error, imageId } = await uploadImage(imageFile);
      if (error || !imageId) return { error: "Image upload failed" };

      await deleteImage(project.imageId); // Delete only after successful upload
      newImageId = imageId;
    }

    // Handle technologies efficiently using a transaction
    let technologyData;
    if (technologies) {
      const techNames = technologies.split(",").map((t) => t.trim());

      const upsertOperations = techNames.map((name) =>
        prisma.technology.upsert({
          where: { name },
          update: {},
          create: { name, slug: makeSlug(name) },
        })
      );

      const existingTechnologies = await prisma.$transaction(upsertOperations);
      technologyData = {
        set: existingTechnologies.map((tech) => ({ id: tech.id })),
      };
    }

    // Dynamically construct updatedData object
    const updatedData = {
      ...(title && { title }),
      ...(description && { content: description }),
      ...(newImageId && { imageId: newImageId }),
      ...(slug && { slug }),
      ...(technologyData && { technologies: technologyData }),
    };

    // Update the project
    const updatedProject = await prisma.project.update({
      where: { id },
      data: updatedData,
    });

    return { message: "Project updated successfully", updatedProject };
  } catch (error) {
    console.error("Error updating project:", error);
    return { error: "An unexpected error occurred while updating the project" };
  }
};

export const getProjectById = cache(async (id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: { technologies: true, thumbnail: true },
    });

    if (!project) return { error: "Project not found" };

    return { project };
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return { error: "An error occurred while fetching the project" };
  }
});

export const searchProjects = cache(
  async (query: string, page = 1, pageSize = 4) => {
    if (!query.trim()) return { error: "Search query cannot be empty" };

    const skip = (page - 1) * pageSize;

    try {
      const [projects, total] = await prisma.$transaction([
        prisma.project.findMany({
          where: {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { content: { contains: query, mode: "insensitive" } },
            ],
          },
          skip,
          take: pageSize,
          orderBy: { createdAt: "desc" },
          include: { technologies: true },
        }),
        prisma.project.count({
          where: {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { content: { contains: query, mode: "insensitive" } },
            ],
          },
        }),
      ]);

      return {
        projects,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / pageSize),
          total,
        },
      };
    } catch (error) {
      console.error("Error searching projects:", error);
      return { error: "An error occurred while searching for projects" };
    }
  }
);
export const getProjectsByTechnology = cache(
  async (technologyName: string, page = 1, pageSize = 4) => {
    const skip = (page - 1) * pageSize;

    try {
      const [projects, total] = await prisma.$transaction([
        prisma.project.findMany({
          where: {
            technologies: {
              some: { name: { equals: technologyName, mode: "insensitive" } },
            },
          },
          skip,
          take: pageSize,
          orderBy: { createdAt: "desc" },
          include: { technologies: true },
        }),
        prisma.project.count({
          where: {
            technologies: {
              some: { name: { equals: technologyName, mode: "insensitive" } },
            },
          },
        }),
      ]);

      return {
        projects,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / pageSize),
          total,
        },
      };
    } catch (error) {
      console.error("Error fetching projects by technology:", error);
      return { error: "An error occurred while fetching projects" };
    }
  }
);
export const getProjectBySlug = cache(async (slug: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
      include: { technologies: true, thumbnail: true },
    });

    if (!project) return { error: "Project not found" };

    return { project };
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return { error: "An error occurred while fetching the project" };
  }
});

export const getRelatedProjects = cache(async (slug: string, limit = 4) => {
  try {
    // Get the project's technologies
    const project = await prisma.project.findUnique({
      where: { slug },
      include: { technologies: { select: { id: true } } },
    });

    if (!project) return { error: "Project not found" };
    if (project.technologies.length === 0)
      return { error: "No related projects found" };

    // Get projects that share at least one technology
    const relatedProjects = await prisma.project.findMany({
      where: {
        slug: { not: slug }, // Exclude the current project
        technologies: {
          some: {
            id: { in: project.technologies.map((tech) => tech.id) },
          },
        },
      },
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { technologies: true, thumbnail: true },
    });

    return { relatedProjects };
  } catch (error) {
    console.error("Error fetching related projects:", error);
    return { error: "An error occurred while fetching related projects" };
  }
});

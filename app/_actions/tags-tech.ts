"use server";

import { prisma } from "@/lib/db";
import { cache } from "react";

export const getAllTags = cache(async () => {
  try {
    const tags = await prisma.tag.findMany();
    return { tags };
  } catch (error) {
    console.log(error);
  }
});

export const getTechnologies = cache(async () => {
  try {
    const technologies = await prisma.technology.findMany();
    return { technologies };
  } catch (error) {
    console.log(error);
  }
});

export const getBlogByTagSlug = cache(async (slug: string) => {
  try {
    const blogPost = await prisma.blogPost.findMany({
      where: {
        tags: {
          some: {
            slug,
          },
        },
        isPublished: true, // You probably only want published blog posts
      },
      include: {
        tags: true,
        thumbnail: true,
        user: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        publishedAt: "desc", // Most recent posts first
      },
    });
    return { blogPost };
  } catch (error) {
    console.error("Error fetching blog posts by tag:", error);
    return { blogPost: [] }; // Return empty array instead of undefined
  }
});

export const getProjectsByTechSlug = cache(async (slug: string) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        technologies: {
          some: {
            slug,
          },
        },
      },
      include: {
        technologies: true,
        thumbnail: true,
        user: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Most recent projects first
      },
    });
    return { projects };
  } catch (error) {
    console.error("Error fetching projects by technology:", error);
    return { projects: [] }; // Return empty array instead of undefined
  }
});

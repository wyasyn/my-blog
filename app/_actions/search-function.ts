"use server";

import { prisma } from "@/lib/db";
import { cache } from "react";

export const searchContent = cache(
  async (query: string, page = 1, pageSize = 4) => {
    if (!query.trim()) return { error: "Search query cannot be empty" };

    const MAX_PAGE_SIZE = 20;
    const validPage = Math.max(1, page);
    const validPageSize = Math.min(Math.max(1, pageSize), MAX_PAGE_SIZE);
    const skip = (validPage - 1) * validPageSize;

    try {
      // Execute both queries in a single transaction
      const [projects, projectsTotal, blogPosts, blogPostsTotal] =
        await prisma.$transaction([
          // Projects query
          prisma.project.findMany({
            where: {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
                { technologies: { some: { name: query } } },
                { content: { contains: query, mode: "insensitive" } },
              ],
            },
            skip,
            take: validPageSize,
            orderBy: { createdAt: "desc" },
            include: { technologies: true },
          }),
          // Projects count
          prisma.project.count({
            where: {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
                { technologies: { some: { name: query } } },
                { content: { contains: query, mode: "insensitive" } },
              ],
            },
          }),
          // Blog posts query
          prisma.blogPost.findMany({
            where: {
              isPublished: true,
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
                { content: { contains: query, mode: "insensitive" } },
                { tags: { some: { name: query } } },
              ],
            },
            skip,
            take: validPageSize,
            orderBy: { publishedAt: "desc" },
            include: { tags: true, thumbnail: true },
          }),
          // Blog posts count
          prisma.blogPost.count({
            where: {
              isPublished: true,
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
                { content: { contains: query, mode: "insensitive" } },
                { tags: { some: { name: query } } },
              ],
            },
          }),
        ]);

      // Calculate combined total results
      const totalResults = projectsTotal + blogPostsTotal;

      return {
        results: {
          projects,
          blogPosts,
        },
        pagination: {
          projects: {
            currentPage: validPage,
            totalPages: Math.ceil(projectsTotal / validPageSize),
            total: projectsTotal,
          },
          blogPosts: {
            currentPage: validPage,
            totalPages: Math.ceil(blogPostsTotal / validPageSize),
            total: blogPostsTotal,
          },
          combined: {
            total: totalResults,
          },
        },
        query,
      };
    } catch (error) {
      console.error("Error searching content:", error);
      return { error: "An error occurred while searching for content" };
    }
  }
);

import { prisma } from "@/lib/db";
import { cache } from "react";

export const getMetrices = cache(async () => {
  const [projectsCount, blogPostsCount, tagsCount, technologiesCount] =
    await Promise.all([
      prisma.project.count(),
      prisma.blogPost.count(),
      prisma.tag.count(),
      prisma.technology.count(),
    ]);
  return { projectsCount, blogPostsCount, tagsCount, technologiesCount };
});

import { MetadataRoute } from "next";
import { getPaginatedProjects } from "./_actions/project-actions";
import { getPaginatedBlog } from "./_actions/blog-actions";
import { getAllTags, getTechnologies } from "./_actions/tags-tech";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const nowDate = new Date().toISOString();

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
}

const staticPages: MetadataRoute.Sitemap = [
  {
    url: baseUrl,
    lastModified: nowDate,
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    url: `${baseUrl}/about`,
    lastModified: nowDate,
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    url: `${baseUrl}/blog`,
    lastModified: nowDate,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${baseUrl}/projects`,
    lastModified: nowDate,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${baseUrl}/contact`,
    lastModified: nowDate,
    changeFrequency: "weekly",
    priority: 0.8,
  },
];

async function generateDynamicPages(): Promise<MetadataRoute.Sitemap> {
  try {
    const [{ projects }, { blogPosts }, tagsTes, technologies] =
      await Promise.all([
        getPaginatedProjects(),
        getPaginatedBlog(),
        getAllTags(),
        getTechnologies(),
      ]);

    const projectPages: MetadataRoute.Sitemap = projects
      ? projects.map((project) => ({
          url: `${baseUrl}/projects/${project.slug}`,
          lastModified: project.createdAt.toISOString(),
          changeFrequency: "weekly",
          priority: 0.8,
        }))
      : [];

    const blogPages: MetadataRoute.Sitemap = blogPosts
      ? blogPosts.map((blog) => ({
          url: `${baseUrl}/blog/${blog.slug}`,
          lastModified: blog.publishedAt
            ? blog.publishedAt.toISOString()
            : nowDate,
          changeFrequency: "weekly",
          priority: 0.8,
        }))
      : [];

    const tagPages: MetadataRoute.Sitemap = tagsTes?.tags
      ? tagsTes.tags.map((tag) => ({
          url: `${baseUrl}/tag/${tag.slug}`,
          lastModified: tag.createdAt ? tag.createdAt.toISOString() : nowDate,
          changeFrequency: "weekly",
          priority: 0.8,
        }))
      : [];

    const techPages: MetadataRoute.Sitemap = technologies?.technologies
      ? technologies.technologies.map((tech) => ({
          url: `${baseUrl}/technology/${tech.slug}`,
          lastModified: tech.createdAt ? tech.createdAt.toISOString() : nowDate,
          changeFrequency: "weekly",
          priority: 0.8,
        }))
      : [];

    return [...projectPages, ...blogPages, ...tagPages, ...techPages];
  } catch (error) {
    console.error("Error generating dynamic pages for sitemap:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicPages = await generateDynamicPages();
  return [...staticPages, ...dynamicPages];
}

// Import the Prisma client (assuming you have it set up)

import { getAllPostsAdmin } from "@/app/_actions/blog-actions";
import { getMetrices } from "@/app/_actions/metrices";
import { getPaginatedProjects } from "@/app/_actions/project-actions";
import Link from "next/link";

const AdminDashboard = async () => {
  const { projectsCount, blogPostsCount, tagsCount, technologiesCount } =
    await getMetrices();

  const { blogPosts } = await getAllPostsAdmin(1, 4);
  const { projects } = await getPaginatedProjects();
  return (
    <div className="admin-dashboard p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Overview Section */}
      <div className="overview mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="stat-card  p-4 rounded-md">
          <h3>Total Projects</h3>
          <p className="text-lg font-semibold">{projectsCount}</p>
        </div>
        <div className="stat-card  p-4 rounded-md">
          <h3>Total Blog Posts</h3>
          <p className="text-lg font-semibold">{blogPostsCount}</p>
        </div>
        <div className="stat-card  p-4 rounded-md">
          <h3>Total Tags</h3>
          <p className="text-lg font-semibold">{tagsCount}</p>
        </div>
        <div className="stat-card  p-4 rounded-md">
          <h3>Total Technologies</h3>
          <p className="text-lg font-semibold">{technologiesCount}</p>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="recent-projects mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
        <ul className="space-y-4">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.id} className="flex flex-col gap-1">
                <Link href={`/dashboard/projects/${project.id}`}>
                  {project.title}
                </Link>
                <small className="text-xs">
                  {new Date(project.createdAt).toLocaleDateString()}
                </small>
              </li>
            ))
          ) : (
            <li>No projects found</li>
          )}
        </ul>
      </div>

      {/* Recent Blog Posts */}
      <div className="recent-blog-posts mt-6">
        <h2 className="text-xl font-semibold mb-3">Recent Blog Posts</h2>
        <ul className="space-y-4">
          {blogPosts && blogPosts.length > 0 ? (
            blogPosts.map((blogPost) => (
              <li key={blogPost.id} className="flex flex-col gap-1">
                <Link href={`/dashboard/blog/${blogPost.id}`}>
                  {blogPost.title}
                </Link>
                <small className="text-xs">
                  {blogPost.publishedAt
                    ? new Date(blogPost.publishedAt).toLocaleDateString()
                    : "N/A"}
                </small>
              </li>
            ))
          ) : (
            <li>No blog found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;

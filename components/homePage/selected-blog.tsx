import { getPaginatedBlog } from "@/app/_actions/blog-actions";
import BlogCard from "../blog-card";
import TablePagination from "../pagination";

export default async function SelectedBlog({
  currentPage,
  showPagination = false,
}: {
  currentPage: number;
  showPagination: boolean | undefined;
}) {
  const { blogPosts, pagination } = await getPaginatedBlog(currentPage);
  if (!blogPosts || blogPosts.length === 0) {
    return <p className="p-3">No Blog Posts found</p>;
  }
  return (
    <section>
      <div className="grid md:grid-cols-2 gap-12 md:gap-24 md:pb-[200px]">
        {blogPosts &&
          blogPosts.length > 0 &&
          blogPosts.map((post, index) => (
            <BlogCard key={post.id} index={index} post={post} />
          ))}
      </div>

      {showPagination && pagination.totalPages > 1 && (
        <div className="mt-8">
          <TablePagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            baseUrl={showPagination ? "/blog" : ""}
          />
        </div>
      )}
    </section>
  );
}

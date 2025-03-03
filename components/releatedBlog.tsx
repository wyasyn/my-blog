import { getRelatedBlog } from "@/app/_actions/blog-actions";
import BlogCard from "./blog-card";

export default async function RelatedBlog({ slug }: { slug: string }) {
  const { relatedBlogs } = await getRelatedBlog(slug);
  if (!relatedBlogs || relatedBlogs.length === 0) {
    return;
  }
  return (
    <section className="py-12 md:py-20">
      <h2 className="mb-4">Related Blog</h2>
      <div className="grid md:grid-cols-2 gap-12 md:gap-24 md:pb-[200px]">
        {relatedBlogs.map((blog, index) => (
          <BlogCard key={blog.id} index={index} post={blog} />
        ))}
      </div>
    </section>
  );
}

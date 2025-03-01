import BlogCard from "../blog-card";

export default function SelectedBlog() {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
}

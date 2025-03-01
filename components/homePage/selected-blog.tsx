import BlogCard from "../blog-card";

export default function SelectedBlog() {
  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-24 md:pb-[200px]">
      <BlogCard index={0} />
      <BlogCard index={1} />
      <BlogCard index={2} />
      <BlogCard index={3} />
    </div>
  );
}

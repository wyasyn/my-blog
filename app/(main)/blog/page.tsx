import SelectedBlog from "@/components/homePage/selected-blog";
import PageTitle from "@/components/page-title";

export default function BlogPage() {
  return (
    <>
      <PageTitle subtitle="thoughts, ideas & stories" title="from the blog" />
      <SelectedBlog />
    </>
  );
}

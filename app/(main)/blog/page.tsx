import SelectedBlog from "@/components/homePage/selected-blog";
import PageTitle from "@/components/page-title";
import { Metadata } from "next";

type SearchParams = {
  searchParams: Promise<{ page: string }>;
};

export const metadata: Metadata = {
  title: "Blog post ",
};

export default async function BlogPage({ searchParams }: SearchParams) {
  const { page } = await searchParams;
  const currentPage = parseInt(page ?? "1") || 1;
  return (
    <>
      <PageTitle subtitle="thoughts, ideas & stories" title="from the blog" />
      <SelectedBlog currentPage={currentPage} showPagination />
    </>
  );
}

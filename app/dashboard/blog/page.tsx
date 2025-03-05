import { Suspense } from "react";
import AddBlog from "../_component/add-blog";
import BlogTable from "../_component/blog-table";
import LoadingSkeleton from "@/components/loadingSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - blog ",
};

type SearchParams = {
  searchParams: Promise<{ page: string }>;
};

export default async function DashboardBlog({ searchParams }: SearchParams) {
  const { page } = await searchParams;
  const currentPage = parseInt(page ?? "1") || 1;
  return (
    <div>
      <AddBlog />
      <Suspense fallback={<LoadingSkeleton />}>
        <BlogTable currentPage={currentPage} />
      </Suspense>
    </div>
  );
}

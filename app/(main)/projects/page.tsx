import HomeProjects from "@/components/homePage/home-projects";
import LoadingSkeleton from "@/components/loadingSkeleton";
import PageTitle from "@/components/page-title";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Projects",
};

type SearchParams = {
  searchParams: Promise<{ page: string }>;
};

export default async function ProjectsPage({ searchParams }: SearchParams) {
  const { page } = await searchParams;
  const currentPage = parseInt(page ?? "1") || 1;
  return (
    <>
      <PageTitle subtitle="explore recent projects" title="selected works" />
      <Suspense fallback={<LoadingSkeleton />}>
        <HomeProjects currentPage={currentPage} showPagination />
      </Suspense>
    </>
  );
}

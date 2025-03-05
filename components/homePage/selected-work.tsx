import React, { Suspense } from "react";
import SectionTitle from "../section-title";
import HomeProjects from "./home-projects";
import { Button } from "../ui/button";
import Link from "next/link";
import LoadingSkeleton from "../loadingSkeleton";

export default function SelectedWork({
  currentPage = 1,
}: {
  currentPage?: number;
}) {
  return (
    <section className="my-14 md:my-32">
      <SectionTitle subtitle="explore recent projects" title="selected works" />
      <Suspense fallback={<LoadingSkeleton />}>
        <HomeProjects currentPage={currentPage} showPagination={undefined} />
      </Suspense>
      <Button variant="link" size="sm" className="mt-8">
        <Link href="/projects">View all projects</Link>
      </Button>
    </section>
  );
}

import { getProjectsByTechnology } from "@/app/_actions/project-actions";
import { getTechnologies } from "@/app/_actions/tags-tech";
import HomeProjects from "@/components/homePage/home-projects";
import LoadingSkeleton from "@/components/loadingSkeleton";
import SectionTitle from "@/components/section-title";
import { Metadata } from "next";
import { Suspense } from "react";

type Params = {
  params: Promise<{ technology: string }>;
};
export async function generateStaticParams() {
  const result = await getTechnologies();
  if (!result) {
    throw new Error("Failed to fetch technologies");
  }
  const { technologies } = result;
  return technologies.map((tech) => ({
    slug: tech.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { technology } = await params;

  return {
    title: `${technology} - Projects`,
  };
}

export default async function Tech({ params }: Params) {
  const { technology } = await params;

  const { projects } = await getProjectsByTechnology(technology);
  if (!projects)
    return <p className="p-4">No projects found for this technology</p>;
  return (
    <section>
      <SectionTitle subtitle={technology} title="Projects" />
      <Suspense fallback={<LoadingSkeleton />}>
        <HomeProjects currentPage={1} showPagination />
      </Suspense>
    </section>
  );
}

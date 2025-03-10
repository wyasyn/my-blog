import {
  getProjectsByTechSlug,
  getTechnologies,
} from "@/app/_actions/tags-tech";
import HomeProjects from "@/components/homePage/home-projects";
import LoadingSkeleton from "@/components/loadingSkeleton";
import SectionTitle from "@/components/section-title";
import { deSlugify } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";

type Params = {
  params: Promise<{ slug: string }>;
};
export async function generateStaticParams() {
  try {
    const result = await getTechnologies();
    if (!result) {
      return [];
    }
    const { technologies } = result;

    return (
      technologies?.map((tech) => ({
        slug: tech.slug, // Changed from 'technology' to 'slug' to match the route parameter
      })) || []
    );
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${deSlugify(slug)} - Projects`,
  };
}

export default async function Tech({ params }: Params) {
  const { slug } = await params;

  const result = await getProjectsByTechSlug(slug);
  const projects = result?.projects || [];

  if (!projects.length) {
    return <p className="p-4">No projects found for this technology</p>;
  }
  return (
    <section>
      <SectionTitle subtitle={deSlugify(slug)} title="Projects" />
      <Suspense fallback={<LoadingSkeleton />}>
        <HomeProjects currentPage={1} showPagination />
      </Suspense>
    </section>
  );
}

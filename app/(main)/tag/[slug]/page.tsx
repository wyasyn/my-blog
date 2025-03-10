import { getAllTags, getBlogByTagSlug } from "@/app/_actions/tags-tech";
import SelectedBlog from "@/components/homePage/selected-blog";
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
    const result = await getAllTags();
    if (!result) {
      return [];
    }
    const { tags } = result;

    return (
      tags?.map((tag) => ({
        slug: tag.slug, // Changed from 'tag' to 'slug' to match the route parameter
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
    title: `${deSlugify(slug)} - Blogs`,
  };
}

export default async function TagItem({ params }: Params) {
  const { slug } = await params;
  const result = await getBlogByTagSlug(slug);
  const blogPost = result?.blogPost;

  if (!blogPost) {
    return <p className="p-4">No blog posts found for this tag</p>;
  }
  return (
    <section>
      <SectionTitle subtitle={deSlugify(slug)} title="Blog" />
      <Suspense fallback={<LoadingSkeleton />}>
        <SelectedBlog currentPage={1} showPagination={undefined} />
      </Suspense>
    </section>
  );
}

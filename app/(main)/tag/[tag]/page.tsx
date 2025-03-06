import { getBlogByTag } from "@/app/_actions/blog-actions";
import { getAllTags } from "@/app/_actions/tags-tech";
import SelectedBlog from "@/components/homePage/selected-blog";
import LoadingSkeleton from "@/components/loadingSkeleton";
import SectionTitle from "@/components/section-title";
import { Metadata } from "next";
import { Suspense } from "react";

type Params = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const result = await getAllTags();
  if (!result || !result.tags) return;
  const { tags } = result;
  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tag } = await params;

  return {
    title: `${tag} - Blogs`,
  };
}

export default async function TagItem({ params }: Params) {
  const { tag } = await params;
  const { blogPost } = await getBlogByTag(tag);
  if (!blogPost) return <p className="p-4">No blog posts found for this tag</p>;
  return (
    <section>
      <SectionTitle subtitle={tag} title="Blog" />
      <Suspense fallback={<LoadingSkeleton />}>
        <SelectedBlog currentPage={1} showPagination={undefined} />
      </Suspense>
    </section>
  );
}

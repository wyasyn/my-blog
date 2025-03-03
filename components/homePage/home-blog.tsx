import Link from "next/link";
import SectionTitle from "../section-title";
import SelectedBlog from "./selected-blog";
import { Button } from "../ui/button";
import { Suspense } from "react";
import LoadingSkeleton from "../loadingSkeleton";

export default function HomeBlog({
  currentPage = 1,
}: {
  currentPage?: number;
}) {
  return (
    <section className="my-14 md:my-32">
      <SectionTitle
        subtitle="thoughts, ideas & stories"
        title="from the blog"
      />
      <Suspense fallback={<LoadingSkeleton />}>
        <SelectedBlog currentPage={currentPage} />
      </Suspense>
      <Button variant="link" size="sm" className="mt-8">
        <Link href="/blog">View all posts</Link>
      </Button>
    </section>
  );
}

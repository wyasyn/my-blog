import Link from "next/link";
import SectionTitle from "../section-title";
import SelectedBlog from "./selected-blog";
import { Button } from "../ui/button";

export default function HomeBlog() {
  return (
    <section className="my-14 md:my-32">
      <SectionTitle
        subtitle="thoughts, ideas & stories"
        title="from the blog"
      />
      <SelectedBlog />
      <Button variant="link" size="sm" className="mt-8">
        <Link href="/blog">View all posts</Link>
      </Button>
    </section>
  );
}

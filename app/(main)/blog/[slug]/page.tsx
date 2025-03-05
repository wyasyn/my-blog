import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/code-block";
import { Article, WithContext } from "schema-dts";

import { Calendar, Clock } from "lucide-react";
import { calculateReadingTime, formatDateString } from "@/lib/utils";
import Link from "next/link";
import { getBlogBySlug, getPaginatedBlog } from "@/app/_actions/blog-actions";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/loadingSkeleton";
import RelatedBlog from "@/components/releatedBlog";
import { Metadata } from "next";
import { socials } from "@/components/homePage/hero";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { blogPosts } = await getPaginatedBlog();

  if (!blogPosts) return;

  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const { blogPost } = await getBlogBySlug(slug);

  return {
    title: blogPost?.title,
    openGraph: {
      title: blogPost?.title,
      images: blogPost?.thumbnail ? [{ url: blogPost.thumbnail.imageUrl }] : [],
    },
  };
}

export default async function SingleBlogPage({ params }: Params) {
  const { slug } = await params;
  const { blogPost } = await getBlogBySlug(slug);

  if (!blogPost) notFound();

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blogPost?.title,
    image: blogPost?.thumbnail ? [blogPost.thumbnail.imageUrl] : [],
    datePublished: blogPost?.publishedAt
      ? new Date(blogPost.publishedAt).toISOString()
      : "",
    dateModified: blogPost?.publishedAt
      ? new Date(blogPost.publishedAt).toISOString()
      : "",
    author: [
      {
        "@type": "Person",
        name: "Yasin Walum",
        url: "https://ywalum.com",
        sameAs: socials.map((social) => social.link),
      },
    ],
  };

  return (
    <main>
      <header className="mb-12 md:mb-20">
        <h1 className="text-balance">{blogPost.title}</h1>
        <p className="flex items-center gap-4 mb-3 text-sm">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />{" "}
            {calculateReadingTime(blogPost.content)} min
          </span>{" "}
          |{" "}
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formatDateString(blogPost.publishedAt?.toISOString() || "")}
          </span>
        </p>
        <div className=" my-4 flex items-center gap-4 flex-wrap">
          {blogPost.tags &&
            blogPost.tags.length > 0 &&
            blogPost.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/tag/${tag.slug}`}
                className="bg-secondary py-2 px-3 shrink-0 rounded-2xl border text-xs hover:text-foreground duration-300"
              >
                {tag.name}
              </Link>
            ))}
        </div>
      </header>

      {/* Markdown Renderer with Custom Code Block */}
      <div className="prose dark:prose-invert prose-pre:bg-transparent prose-pre:p-0 prose-p:text-muted-foreground prose-li:text-muted-foreground prose-h2:text-muted-foreground prose-h3:text-muted-foreground">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({
              inline,
              className,
              children,
              ...props
            }: {
              inline?: boolean;
              className?: string;
              children?: React.ReactNode;
            }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline ? (
                <CodeBlock
                  code={String(children).trim()}
                  language={match?.[1] || "plaintext"}
                />
              ) : (
                <code
                  className="px-1 py-0.5 rounded bg-muted text-primary text-sm"
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {blogPost.content}
        </ReactMarkdown>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <RelatedBlog slug={blogPost.slug} />
      </Suspense>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}

import {
  getPaginatedProjects,
  getProjectBySlug,
} from "@/app/_actions/project-actions";
import { calculateReadingTime, formatDateString } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/code-block";
import RelatedProjects from "@/components/relatedProjects";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/loadingSkeleton";
import { Metadata } from "next";
import { Article, WithContext } from "schema-dts";

export async function generateStaticParams() {
  const { projects } = await getPaginatedProjects();

  if (!projects) return;

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const { project } = await getProjectBySlug(slug);

  return {
    title: project?.title,
    openGraph: {
      title: project?.title,
      images: [{ url: project?.thumbnail.imageUrl || "" }],
    },
  };
}

export default async function SingleProjectPage({ params }: Params) {
  const { slug } = await params;
  const { project } = await getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project?.title,
    image: project?.thumbnail ? [project.thumbnail.imageUrl] : [],
    datePublished: project?.createdAt
      ? new Date(project.createdAt).toISOString()
      : "",
    dateModified: project?.createdAt
      ? new Date(project.createdAt).toISOString()
      : "",
    author: [
      {
        "@type": "Person",
        name: "Yasin Walum",
        url: "https://ywalum.com",
        sameAs: [
          "https://github.com/wyasyn",
          "https://www.linkedin.com/in/yasin-walum",
        ],
      },
    ],
  };
  return (
    <main>
      <header className="mb-12 md:mb-20">
        <h1 className="text-balance">{project.title}</h1>
        <p className="flex items-center gap-4 mb-3 text-sm">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />{" "}
            {calculateReadingTime(project.content)} min
          </span>{" "}
          |{" "}
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />{" "}
            {formatDateString(project.createdAt.toISOString())}
          </span>
        </p>
        <div className=" my-4 flex items-center gap-4 flex-wrap">
          {project.technologies &&
            project.technologies.length > 0 &&
            project.technologies.map((technology) => (
              <Link
                key={technology.id}
                href={`/technology/${technology.slug}`}
                className="bg-secondary py-2 px-3 rounded-2xl border text-xs w-fit hover:text-foreground duration-300"
              >
                {technology.name}
              </Link>
            ))}
        </div>
      </header>
      <section className="prose dark:prose-invert prose-pre:bg-transparent prose-pre:p-0 prose-p:text-muted-foreground prose-li:text-muted-foreground prose-h2:text-muted-foreground prose-h3:text-muted-foreground">
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
          {project.content}
        </ReactMarkdown>
      </section>
      <Suspense fallback={<LoadingSkeleton />}>
        <RelatedProjects slug={project.slug} />
      </Suspense>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}

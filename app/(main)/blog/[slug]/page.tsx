import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/code-block";
import { sampleMarkdown } from "@/lib/data";
import { Calendar, Clock } from "lucide-react";
import { calculateReadingTime, formatDateString } from "@/lib/utils";
import Link from "next/link";

export default async function SingleBlogPage() {
  const { data, content } = matter(sampleMarkdown);

  return (
    <main>
      <header className="mb-12 md:mb-20">
        <h1 className="text-balance">{data.title}</h1>
        <p className="flex items-center gap-4 mb-3">
          <span className="flex items-center gap-2">
            <Clock /> {calculateReadingTime(content)} min
          </span>{" "}
          |{" "}
          <span className="flex items-center gap-2">
            <Calendar /> {formatDateString(data.date)}
          </span>
        </p>
        <div className=" my-4 flex items-center gap-4 flex-wrap">
          <Link
            href={`/technology/slug`}
            className="bg-secondary py-2 px-3 rounded-2xl border text-xs w-fit hover:text-foreground duration-300"
          >
            ML Model Development
          </Link>
        </div>
      </header>

      {/* Markdown Renderer with Custom Code Block */}
      <div className="prose dark:prose-invert prose-pre:bg-transparent prose-pre:p-0">
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
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </main>
  );
}

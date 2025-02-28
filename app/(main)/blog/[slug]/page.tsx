import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/code-block";
import { sampleMarkdown } from "@/lib/data";

export default async function SingleBlogPage() {
  const { data, content } = matter(sampleMarkdown);

  return (
    <main>
      <header>
        <h1>{data.title}</h1>
        <p>
          {data.author} | {data.date}
        </p>
        <ul>
          {data.tags.map((tag: string) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
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

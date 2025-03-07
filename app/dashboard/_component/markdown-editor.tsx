"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  Code,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  Edit,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import CodeBlock from "@/components/code-block";
import { InlineCode } from "@/components/inline-code";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  rows?: number;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  className,
  placeholder = "Write your content in markdown...",
  rows = 20,
}) => {
  const [activeTab, setActiveTab] = useState<string>("edit");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  // Insert markdown formatting at cursor position
  const insertFormatting = (
    startChars: string,
    endChars: string = startChars,
    defaultText = ""
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    const newText = selectedText
      ? beforeText + startChars + selectedText + endChars + afterText
      : beforeText + startChars + defaultText + endChars + afterText;

    onChange(newText);

    // Set cursor position after the operation
    setTimeout(() => {
      textarea.focus();

      textarea.setSelectionRange(
        selectedText ? start + startChars.length : start + startChars.length,
        selectedText
          ? end + startChars.length
          : start + startChars.length + defaultText.length
      );
    }, 0);
  };

  const formatActions = [
    {
      icon: <Bold size={18} />,
      title: "Bold (Ctrl+B)",
      action: () => insertFormatting("**", "**", "bold text"),
    },
    {
      icon: <Italic size={18} />,
      title: "Italic (Ctrl+I)",
      action: () => insertFormatting("*", "*", "italic text"),
    },
    {
      icon: <Heading1 size={18} />,
      title: "Heading 1",
      action: () => insertFormatting("# ", "", "Heading 1"),
    },
    {
      icon: <Heading2 size={18} />,
      title: "Heading 2",
      action: () => insertFormatting("## ", "", "Heading 2"),
    },
    {
      icon: <Heading3 size={18} />,
      title: "Heading 3",
      action: () => insertFormatting("### ", "", "Heading 3"),
    },
    {
      icon: <List size={18} />,
      title: "Bullet List",
      action: () => insertFormatting("- ", "", "List item"),
    },
    {
      icon: <ListOrdered size={18} />,
      title: "Numbered List",
      action: () => insertFormatting("1. ", "", "List item"),
    },
    {
      icon: <LinkIcon size={18} />,
      title: "Link",
      action: () =>
        insertFormatting("[", "](https://example.com)", "link text"),
    },
    {
      icon: <ImageIcon size={18} />,
      title: "Image",
      action: () =>
        insertFormatting("![", "](https://example.com/image.jpg)", "alt text"),
    },
    {
      icon: <Code size={18} />,
      title: "Code",
      action: () => insertFormatting("`", "`", "code"),
    },
    {
      icon: <Quote size={18} />,
      title: "Blockquote",
      action: () => insertFormatting("> ", "", "Blockquote"),
    },
  ];

  return (
    <div
      className={cn(
        "border rounded-md overflow-hidden transition-all duration-200",
        isFullscreen && "fixed inset-0 z-50 bg-background",
        className
      )}
    >
      <div className="flex items-center justify-between p-2 border-b bg-muted/50">
        <div className="flex flex-wrap gap-1">
          {formatActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              title={action.title}
              onClick={action.action}
              className="h-8 w-8 p-0"
            >
              {action.icon}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 w-8 p-0"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="edit"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full rounded-none border-b">
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Edit size={16} /> Edit
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye size={16} /> Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="edit" className="p-0 m-0">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="border-0 rounded-none min-h-[300px] focus-visible:ring-0 resize-none"
            style={{
              height: isFullscreen ? "calc(100vh - 120px)" : `${rows * 1.5}rem`,
            }}
          />
        </TabsContent>
        <TabsContent
          value="preview"
          className="p-4 m-0 prose dark:prose-invert max-w-none overflow-auto prose-pre:bg-transparent prose-pre:p-0"
          style={{
            height: isFullscreen ? "calc(100vh - 120px)" : `${rows * 1.5}rem`,
            minHeight: "300px",
          }}
        >
          {value ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({
                  className,
                  children,
                }: {
                  inline?: boolean;
                  className?: string;
                  children?: React.ReactNode;
                }) {
                  // Extract language from className if it exists
                  const match = /language-(\w+)/.exec(className || "");
                  const language = match?.[1] || "plaintext";

                  return match ? (
                    <CodeBlock
                      code={String(children).trim()}
                      language={language}
                    />
                  ) : (
                    <InlineCode code={String(children).trim()} />
                  );
                },
              }}
            >
              {value}
            </ReactMarkdown>
          ) : (
            <p className="text-muted-foreground">Nothing to preview</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarkdownEditor;

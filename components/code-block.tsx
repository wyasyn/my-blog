"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "plaintext",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <span className="relative mt-8 block ">
      {/* Language Label */}
      <span className="absolute -top-8 left-0 bg-accent text-muted-foreground text-xs px-2 py-1 rounded">
        {language}
      </span>

      {/* Copy Button */}
      <button
        className="absolute top-2 right-2 p-1 text-xs rounded hover:scale-110 text-muted-foreground transition-all duration-300 cursor-pointer"
        onClick={handleCopy}
        aria-label="Copy code"
        aria-describedby="copied-message"
        title="Copy code"
        type="button"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>

      {/* Code Syntax Highlighter */}
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </span>
  );
};

export default CodeBlock;

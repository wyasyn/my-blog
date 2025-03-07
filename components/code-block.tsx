"use client";

import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "plaintext",
}) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-secondary border rounded-lg p-2">
      {/* Language Label */}
      <div className="flex items-center justify-between gap-4">
        <span className=" text-muted-foreground text-xs px-2 py-1 rounded">
          {language}
        </span>

        {/* Copy Button */}
        <button
          type="button"
          className=" p-1 text-xs rounded text-muted-foreground "
          onClick={handleCopy}
          aria-label="Copy code"
          aria-describedby="copied-message"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Code Syntax Highlighter */}
      <SyntaxHighlighter
        language={language}
        PreTag="div"
        style={theme === "light" ? oneLight : oneDark}
        showLineNumbers
        customStyle={{
          padding: "20px",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;

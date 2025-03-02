"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import matter from "gray-matter";
import { CircleCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateBlog() {
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (
      file &&
      (file.type === "text/markdown" ||
        file.name.endsWith(".mdx") ||
        file.name.endsWith(".md"))
    ) {
      const reader = new FileReader();

      reader.onload = () => {
        setBody(reader.result as string);
        setFileName(file.name);
      };

      reader.readAsText(file);
    } else {
      toast.error("Please upload a valid .md or .mdx file");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !body) {
      toast.error("Please provide both an image and a markdown file.");
      return;
    }

    try {
      const { data, content } = matter(body);
      const title = data.title || "Untitled";
      const tags = Array.isArray(data.tags) ? data.tags.join(",") : "";

      const formData = new FormData();
      formData.append("imageFile", imageFile);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tags", tags);

      console.log("Form Data Ready:", { title, content, tags, imageFile });

      toast.success(
        "Blog successfully prepared! (Replace console.log with API call)"
      );
    } catch {
      toast.error(
        "Error parsing markdown file. Ensure it has valid frontmatter."
      );
    }
  };

  const handleClear = () => {
    setBody("");
    setImageFile(null);
    setFileName("");
    toast.info("Form cleared");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div className="space-y-3">
        <Label htmlFor="body">
          Blog Markdown{" "}
          {body && (
            <span className="text-emerald-600 ml-3">
              <CircleCheck className="w-4 h-4" />
            </span>
          )}
        </Label>
        <Input
          id="body"
          type="file"
          accept=".md,.mdx"
          onChange={handleFileChange}
        />
        {fileName && <p className="text-sm ">Selected: {fileName}</p>}
      </div>
      <div className="space-y-3">
        <Label htmlFor="image">
          Blog Image{" "}
          {imageFile && (
            <span className="text-emerald-600 ml-3">
              <CircleCheck className="w-4 h-4" />
            </span>
          )}
        </Label>
        <Input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
      </div>
      <div className="flex gap-3 mt-4">
        <Button type="submit" size="sm">
          Create blog
        </Button>
        <Button
          type="button"
          size="sm"
          variant="destructive"
          onClick={handleClear}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>
    </form>
  );
}

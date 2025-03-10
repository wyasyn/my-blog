"use client";
import { createProject } from "@/app/_actions/project-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import matter from "gray-matter";
import { CircleCheck, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateProject() {
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !body) {
      toast.error("Please provide both an image and a markdown file.");
      return;
    }

    try {
      setLoading(true);
      const { data, content } = matter(body);
      const title = data.title || "Untitled";
      const description = data.description || "No description";
      const technologies = Array.isArray(data.technologies)
        ? data.technologies.join(",")
        : "";

      const formData = new FormData();
      formData.append("imageFile", imageFile);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("technologies", technologies);

      const { error, success } = await createProject(formData);

      if (error) {
        toast.error(error);
      } else if (success) {
        toast(success);
        setBody("");
        setImageFile(null);
        setFileName("");

        router.refresh();
      }
    } catch {
      toast.error(
        "Error parsing markdown file. Ensure it has valid frontmatter."
      );
    } finally {
      setLoading(false);
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
          Project Markdown{" "}
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
          Project Image{" "}
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
        <Button
          type="submit"
          size="sm"
          disabled={loading || !body || !imageFile}
        >
          {loading ? "Creating..." : "Create Project"}
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

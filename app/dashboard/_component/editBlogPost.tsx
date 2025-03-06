"use client";

import type React from "react";

import { editBlog } from "@/app/_actions/blog-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import MarkdownEditor from "./markdown-editor";

interface EditBlogProps {
  blog: {
    id: string;
    title: string;
    description: string;
    content: string;
    slug: string;
    thumbnail: {
      imageUrl: string;
      width?: number | null;
      height?: number | null;
    };
    tags: { id: string; name: string }[];
  };
}

const EditBlog: React.FC<EditBlogProps> = ({ blog }) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: blog.title,
      description: blog.description,
      content: blog.content,
      tags: blog.tags.map((t) => t.name).join(", "),
      imageFile: null as File | null,
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("id", blog.id);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("tags", data.tags);

    if (data.imageFile?.length > 0) {
      formData.append("imageFile", data.imageFile[0]);
    }

    const { message, error } = await editBlog(formData);

    if (message) {
      toast(message);
      router.refresh();
    } else if (error) {
      toast.error(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("imageFile", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleContentChange = (value: string) => {
    setValue("content", value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="block font-medium">
            Title
          </Label>
          <Input
            id="title"
            {...register("title", { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="block font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            {...register("description", { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label htmlFor="tags" className="block font-medium">
            Tags (comma-separated)
          </Label>
          <Input
            id="tags"
            {...register("tags")}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Content (Markdown Editor) */}
        <div className="space-y-2">
          <Label htmlFor="content" className="block font-medium">
            Content
          </Label>
          <MarkdownEditor
            value={watch("content")}
            onChange={handleContentChange}
            rows={20}
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <Label htmlFor="image" className="block font-medium">
            Blog Image
          </Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview ? (
            <Image
              src={imagePreview || "/placeholder.svg"}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
              width={200}
              height={200}
            />
          ) : (
            blog.thumbnail && (
              <Image
                src={blog.thumbnail.imageUrl || "/placeholder.svg"}
                alt="Current"
                className="mt-2 w-32 h-32 object-cover rounded"
                width={blog.thumbnail.width || 200}
                height={blog.thumbnail.height || 200}
              />
            )
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="cursor-pointer">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditBlog;

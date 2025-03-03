"use client";
import { editProject } from "@/app/_actions/project-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

interface EditProjectProps {
  project: {
    id: string;
    title: string;
    content: string;
    imageId?: string;
    technologies: { id: string; name: string }[];
  };
}

const EditProject: React.FC<EditProjectProps> = ({ project }) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: project.title,
      description: project.content,
      technologies: project.technologies.map((t) => t.name).join(", "),
      imageFile: null as File | null,
    },
  });

  const [preview, setPreview] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();

  const description = watch("description");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("id", project.id);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("technologies", data.technologies);

    if (data.imageFile?.length > 0) {
      formData.append("imageFile", data.imageFile[0]);
    }

    const { message, error } = await editProject(formData);

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

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="block font-medium">
            Title
          </Label>
          <Input
            id="title"
            {...register("title", { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Technologies */}
        <div>
          <Label htmlFor="tech" className="block font-medium">
            Technologies (comma-separated)
          </Label>
          <Input
            id="tech"
            {...register("technologies")}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Description (Markdown Editor) */}
        <div>
          <Label htmlFor="body" className="block font-medium">
            Description
          </Label>
          <Button
            variant="outline"
            type="button"
            onClick={() => setPreview(!preview)}
          >
            {preview ? "Edit" : "Preview"}
          </Button>

          {preview ? (
            <div className="prose dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {description}
              </ReactMarkdown>
            </div>
          ) : (
            <Textarea
              id="body"
              {...register("description")}
              className="w-full p-2 border rounded h-32"
            />
          )}
        </div>

        {/* Image Upload */}
        <div>
          <Label htmlFor="image" className="block font-medium">
            Project Image
          </Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          ) : (
            project.imageId && (
              <Image
                src={`/images/${project.imageId}`} // Adjust URL based on your backend
                alt="Current"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditProject;

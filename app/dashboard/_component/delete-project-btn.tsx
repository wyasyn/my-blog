"use client";

import { deleteProject } from "@/app/_actions/project-actions";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteProjectBtn({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProject(slug);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      variant="destructive"
      size="icon"
      className="cursor-pointer"
      title="Delete project"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : <Trash2 />}
    </Button>
  );
}

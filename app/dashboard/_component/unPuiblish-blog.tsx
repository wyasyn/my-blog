"use client";

import { unpublishBlogPost } from "@/app/_actions/blog-actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function UnPublishButton({ blogId }: { blogId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePublish = async () => {
    setLoading(true);

    try {
      const { success, message, error } = await unpublishBlogPost(blogId);
      if (error) {
        toast.error(error);
        return;
      } else if (success) {
        toast.success(message);
        router.refresh();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePublish}
      disabled={loading}
      variant="destructive"
      size="sm"
      title="Un publish blog"
      aria-label="Un publish blog"
      type="button"
      className="cursor-pointer"
    >
      {loading ? "Unpublishing..." : "Unpublish Blog"}
    </Button>
  );
}

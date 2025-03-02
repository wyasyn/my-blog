import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateBlog from "./create-blog";

export default function AddBlog() {
  return (
    <div className=" w-full flex items-center justify-end py-3 mb-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon"
            aria-label="Add New blog"
            type="button"
            title="Add blog"
            className="cursor-pointer"
          >
            <PlusIcon className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Blog</DialogTitle>
            <DialogDescription>
              Upload markdown containing frontmatter like title and tags
            </DialogDescription>
          </DialogHeader>
          <CreateBlog />
        </DialogContent>
      </Dialog>
    </div>
  );
}

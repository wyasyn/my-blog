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

import CreateProject from "./create-project";

export default function AddProject() {
  return (
    <div className=" w-full flex items-center justify-end py-3 mb-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon"
            aria-label="Add New Project"
            type="button"
            title="Add button"
            className="cursor-pointer"
          >
            <PlusIcon className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              Upload markdown containing frontmatter like title and technologies
              used
            </DialogDescription>
          </DialogHeader>
          <CreateProject />
        </DialogContent>
      </Dialog>
    </div>
  );
}

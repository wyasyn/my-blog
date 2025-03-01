import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function AddProject() {
  return (
    <div className=" w-full flex items-center justify-end py-3 mb-4">
      <Button
        size="icon"
        aria-label="Add New Project"
        type="button"
        title="Add button"
      >
        <PlusIcon className="h-6 w-6" />
      </Button>
    </div>
  );
}

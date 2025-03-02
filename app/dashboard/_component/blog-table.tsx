import TablePagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FilePenLine, Trash2 } from "lucide-react";

const programmingLanguages = [
  {
    id: "1",
    title: "JavaScript",
  },
  {
    id: "2",
    title: "Python",
  },
  {
    id: "3",
    title: "Java",
  },
  {
    id: "4",
    title: "C++",
  },
  {
    id: "5",
    title: "Ruby",
  },
];

export default function BlogTable() {
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border mb-8">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="h-9 py-2">Title</TableHead>
              <TableHead className="h-9 py-2 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programmingLanguages.map((language) => (
              <TableRow key={language.id}>
                <TableCell className="py-2 font-medium truncate">
                  {language.title}
                </TableCell>

                <TableCell className="py-2 flex items-center justify-center gap-4">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="cursor-pointer"
                    title="Edit Project"
                  >
                    <FilePenLine />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="cursor-pointer"
                    title="Delete project"
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination currentPage={2} totalPages={10} />
    </div>
  );
}

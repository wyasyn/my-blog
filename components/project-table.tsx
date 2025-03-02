import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "./pagination";
import { Button } from "./ui/button";
import { FilePenLine } from "lucide-react";
import { getPaginatedProjects } from "@/app/_actions/project-actions";
import Link from "next/link";
import DeleteProjectBtn from "@/app/dashboard/_component/delete-project-btn";

export default async function ProjectTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const { projects, pagination } = await getPaginatedProjects(currentPage);
  if (!projects || projects.length === 0) {
    return <p>No Projects found</p>;
  }

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
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="py-2 font-medium truncate">
                  {project.title}
                </TableCell>

                <TableCell className="py-2 flex items-center justify-center gap-4">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="cursor-pointer"
                    title="Edit Project"
                    asChild
                  >
                    <Link href={`/dashboard/projects/${project.id}`}>
                      <FilePenLine />
                    </Link>
                  </Button>
                  <DeleteProjectBtn slug={project.slug} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {pagination.totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </div>
  );
}

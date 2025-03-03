import { getAllPostsAdmin } from "@/app/_actions/blog-actions";
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

import { FilePenLine } from "lucide-react";
import Link from "next/link";
import UnPublishButton from "./unPuiblish-blog";
import PublishButton from "./Publish-blog";

export default async function BlogTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const { blogPosts, pagination } = await getAllPostsAdmin(currentPage, 4);
  if (!blogPosts || blogPosts.length === 0) {
    return <p>No Blog Posts found</p>;
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
            {blogPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="py-2 font-medium truncate">
                  {post.title}
                </TableCell>

                <TableCell className="py-2 flex items-center justify-center gap-4">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="cursor-pointer"
                    title="Edit blog"
                  >
                    <Link href={`/dashboard/blog/${post.id}`}>
                      <FilePenLine />
                    </Link>
                  </Button>
                  {post.isPublished ? (
                    <UnPublishButton blogId={post.id} />
                  ) : (
                    <PublishButton blogId={post.id} />
                  )}
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
          baseUrl="/dashboard/blog"
        />
      )}
    </div>
  );
}

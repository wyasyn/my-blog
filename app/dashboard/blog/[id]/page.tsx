import { notFound } from "next/navigation";
import { getPostByIdAdmin } from "@/app/_actions/blog-actions";
import EditBlog from "../../_component/editBlogPost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit blog ",
};

type Params = {
  params: Promise<{ id: string }>;
};

export default async function EditPage({ params }: Params) {
  const { id } = await params;
  const { blogPost } = await getPostByIdAdmin(id);
  if (!blogPost) notFound();
  return (
    <>
      <EditBlog blog={blogPost} />
    </>
  );
}

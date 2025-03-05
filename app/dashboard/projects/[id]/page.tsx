import { getProjectById } from "@/app/_actions/project-actions";
import EditProject from "../../_component/editProject";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Project ",
};

type Params = {
  params: Promise<{ id: string }>;
};

export default async function EditPage({ params }: Params) {
  const { id } = await params;
  const { project } = await getProjectById(id);
  if (!project) notFound();
  return (
    <>
      <EditProject project={project} />
    </>
  );
}

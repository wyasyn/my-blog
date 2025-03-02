import ProjectTable from "@/components/project-table";
import AddProject from "../_component/add-project-btn";
import { Suspense } from "react";

type SearchParams = {
  searchParams: Promise<{ page: string }>;
};

export default async function DashboardProjects({
  searchParams,
}: SearchParams) {
  const { page } = await searchParams;
  const currentPage = parseInt(page ?? "1") || 1;

  return (
    <div>
      <AddProject />
      <Suspense fallback={<p>Loading...</p>}>
        <ProjectTable currentPage={currentPage} />
      </Suspense>
    </div>
  );
}

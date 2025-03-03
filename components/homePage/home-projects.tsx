import { getPaginatedProjects } from "@/app/_actions/project-actions";
import TablePagination from "../pagination";
import ProjectCard from "../project-card";

export default async function HomeProjects({
  currentPage,
  showPagination = false,
}: {
  currentPage: number;
  showPagination?: boolean;
}) {
  const { projects, pagination } = await getPaginatedProjects(currentPage);
  if (!projects || projects.length === 0) {
    return <p className="p-3">No Projects found</p>;
  }
  return (
    <section>
      <div className="grid md:grid-cols-2 gap-12 md:gap-24 md:pb-[200px]">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} index={index} project={project} />
        ))}
      </div>
      {showPagination && pagination.totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          baseUrl={showPagination ? "/projects" : "/"}
        />
      )}
    </section>
  );
}

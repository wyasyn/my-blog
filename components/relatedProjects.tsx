import { getRelatedProjects } from "@/app/_actions/project-actions";
import ProjectCard from "./project-card";

export default async function RelatedProjects({ slug }: { slug: string }) {
  const { relatedProjects } = await getRelatedProjects(slug);
  if (!relatedProjects || relatedProjects.length === 0) {
    return;
  }
  return (
    <section className="py-12 md:py-20">
      <h2 className="mb-4">Related Projects</h2>
      <div className="grid md:grid-cols-2 gap-12 md:gap-24 md:pb-[200px]">
        {relatedProjects.map((project, index) => (
          <ProjectCard key={project.id} index={index} project={project} />
        ))}
      </div>
    </section>
  );
}

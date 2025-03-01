import ProjectCard from "../project-card";

export default function HomeProjects() {
  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-24 md:pb-[200px]">
      <ProjectCard index={0} />
      <ProjectCard index={1} />
      <ProjectCard index={2} />
      <ProjectCard index={3} />
    </div>
  );
}

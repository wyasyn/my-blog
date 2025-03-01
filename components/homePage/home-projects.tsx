import ProjectCard from "../project-card";

export default function HomeProjects() {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </div>
  );
}

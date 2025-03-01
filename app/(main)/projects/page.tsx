import HomeProjects from "@/components/homePage/home-projects";
import PageTitle from "@/components/page-title";

export default function ProjectsPage() {
  return (
    <>
      <PageTitle subtitle="explore recent projects" title="selected works" />
      <HomeProjects />
    </>
  );
}

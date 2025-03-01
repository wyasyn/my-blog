import ProjectTable from "@/components/project-table";
import AddProject from "../_component/add-project-btn";

export default function DashboardProjects() {
  return (
    <div>
      <AddProject />
      <ProjectTable />
    </div>
  );
}

import { skills } from "@/data/skills";
import { cn } from "@/lib/utils"; // Ensure you have a utility for class merging

export default function SkillsComponent() {
  return (
    <div className="relative">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 ">
        {skills.map((skill) => (
          <li key={skill.id}>
            <div className="p-6 border rounded-lg bg-secondary flex flex-col gap-3 shrink-0 items-center justify-center">
              <div className={cn("text-7xl", skill.colorClass)}>
                {skill.icon}
              </div>
              <span>{skill.name}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="absolute bg-radial from-transparent to-background inset-0" />
    </div>
  );
}

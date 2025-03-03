import {
  BriefcaseBusiness,
  Home,
  Image as LucideImage,
  Rss,
} from "lucide-react";

import NavItem from "./nav-item";
import SignOut from "@/components/signout";

const navList = [
  {
    name: "Home",
    link: "/dashboard",
    icon: <Home className="w-4 h-4" />,
  },
  {
    name: "Project",
    link: "/dashboard/projects",
    icon: <BriefcaseBusiness className="w-4 h-4" />,
  },
  {
    name: "Blog",
    link: "/dashboard/blog",
    icon: <Rss className="w-4 h-4" />,
  },
  {
    name: "Photo",
    link: "/dashboard/photo",
    icon: <LucideImage className="w-4 h-4" />,
  },
];

export default function DashboardNav() {
  return (
    <header className="border md:sticky md:top-[75px] rounded-lg p-4 lg:w-[200px] md:max-h-[400px]">
      <nav>
        <ul className="flex md:flex-col max-md:justify-between max-md:items-center gap-4 md:h-full">
          {navList.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
          <li>
            <SignOut />
          </li>
        </ul>
      </nav>
    </header>
  );
}

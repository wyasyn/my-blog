import { Briefcase, Mail, Newspaper, User } from "lucide-react";
import NavItem from "./nav-item";

export const navData = [
  {
    title: "About",
    href: "/about",
    icon: <User className="w-5 h-5" />,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    title: "Blog",
    href: "/blog",
    icon: <Newspaper className="w-5 h-5" />,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <Mail className="w-5 h-5" />,
  },
];
export default function NavList() {
  return (
    <ul className="hidden sm:flex gap-5 items-center text-sm">
      {navData.map((item, index) => {
        return <NavItem key={index} title={item.title} href={item.href} />;
      })}
    </ul>
  );
}

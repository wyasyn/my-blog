import { Briefcase, Home, Mail, Newspaper, User } from "lucide-react";
import NavItem from "./nav-item";

export const navData = [
  {
    title: "Home",
    href: "/",
    icon: <Home size={24} />,
  },
  {
    title: "About",
    href: "/about",
    icon: <User size={24} />,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <Briefcase size={24} />,
  },
  {
    title: "Blog",
    href: "/blog",
    icon: <Newspaper size={24} />,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <Mail size={24} />,
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

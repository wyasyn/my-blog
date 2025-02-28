"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);
  return (
    <li
      className={`flex items-center gap-2 hover:text-foreground duration-300 transition-all ${
        isActive ? "text-foreground" : "text-muted-foreground"
      }`}
    >
      <Link href={href} className="flex items-center gap-1">
        {title}
      </Link>
    </li>
  );
}

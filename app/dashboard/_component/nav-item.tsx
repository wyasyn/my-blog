"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ItemProps {
  item: {
    link: string;
    name: string;
    icon: React.ReactNode;
  };
}
export default function NavItem({ item }: ItemProps) {
  const pathname = usePathname();
  const isActive =
    item.link === "/dashboard"
      ? pathname === item.link
      : pathname.startsWith(item.link);
  return (
    <li>
      <Link
        href={item.link}
        className={cn(
          "flex gap-3 items-center text-sm hover:bg-card duration-300 transition-all p-3 rounded-md",
          isActive ? "bg-card" : "bg-secondary"
        )}
      >
        {item.icon} <span className="hidden md:block">{item.name}</span>
      </Link>
    </li>
  );
}

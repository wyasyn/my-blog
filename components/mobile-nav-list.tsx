"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { EllipsisVertical } from "lucide-react";
import { navData } from "./nav-list";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./logo";

export default function MobileNavList() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="sm:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="sm:hidden cursor-pointer hover:bg-background duration-300 rounded-md  p-1">
          <EllipsisVertical />
        </SheetTrigger>
        <SheetContent side="left" className="sm:hidden">
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </VisuallyHidden>
          <ul className="flex flex-col gap-6 mt-8 p-8 font-serif text-3xl ">
            {navData.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-8 hover:bg-accent px-3 py-2 rounded-lg duration-300 ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                    passHref={true}
                  >
                    <span className={isActive ? "fill-foreground" : ""}>
                      {item.icon}{" "}
                    </span>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto p-8 flex items-center gap-4 border-t rounded-[0_2rem_0_0] bg-secondary">
            <Logo /> <span>Yasin Walum</span>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

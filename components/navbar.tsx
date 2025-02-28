import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import profilePic from "@/lib/assets/images/hero.jpg";
import NavList from "./nav-list";
import MobileNavList from "./mobile-nav-list";

export default function Navbar() {
  return (
    <header className=" max-w-[1040px] px-2 py-1 border fixed top-4 lg:top-8 left-1/2 -translate-x-1/2 w-full rounded-lg z-50 bg-secondary/75 backdrop-blur-sm">
      <nav className="flex justify-between items-center gap-5">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <Image
              src={profilePic.src}
              width={profilePic.width}
              height={profilePic.height}
              alt="Profile pic"
              className="object-cover rounded-md"
            />
          </Link>
        </Button>
        <section className="flex items-center gap-4">
          <NavList />
          <ModeToggle />
          <MobileNavList />
        </section>
      </nav>
    </header>
  );
}

import React from "react";
import { ModeToggle } from "./mode-toggle";
import NavList from "./nav-list";
import MobileNavList from "./mobile-nav-list";
import NavWrapper from "./nav-wrapper";
import Logo from "./logo";

export default function Navbar() {
  return (
    <NavWrapper>
      <nav className="flex justify-between items-center gap-5">
        <Logo />
        <section className="flex items-center gap-4">
          <NavList />
          <ModeToggle />
          <MobileNavList />
        </section>
      </nav>
    </NavWrapper>
  );
}

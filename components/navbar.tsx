import React from "react";
import { ModeToggle } from "./mode-toggle";
import NavList from "./nav-list";
import MobileNavList from "./mobile-nav-list";
import NavWrapper from "./nav-wrapper";
import Logo from "./logo";
import Search from "./search";

export default function Navbar() {
  return (
    <NavWrapper>
      <nav className="flex justify-between items-center gap-5">
        <div className="flex gap-4 items-center">
          <Logo />
          <Search />
        </div>

        <section className="flex items-center gap-4">
          <NavList />
          <ModeToggle />
          <MobileNavList />
        </section>
      </nav>
    </NavWrapper>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function NavWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < scrollY);
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);
  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 w-full max-w-[1040px] px-2 py-1 border rounded-lg z-50 bg-secondary/75 backdrop-blur-sm transition-all duration-300 ${
        isScrollingUp ? "top-4 lg:top-8" : "top-0 "
      }`}
    >
      {children}
    </header>
  );
}

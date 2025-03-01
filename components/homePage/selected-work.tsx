import React from "react";
import SectionTitle from "../section-title";
import HomeProjects from "./home-projects";
import { Button } from "../ui/button";
import Link from "next/link";

export default function SelectedWork() {
  return (
    <section className="my-14 md:my-32">
      <SectionTitle subtitle="explore recent projects" title="selected works" />
      <HomeProjects />
      <Button variant="link" size="sm" className="mt-8">
        <Link href="/projects">View all projects</Link>
      </Button>
    </section>
  );
}

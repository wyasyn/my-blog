import React from "react";

export default function SectionTitle({
  subtitle,
  title,
}: {
  subtitle: string;
  title: string;
}) {
  return (
    <header className="mb-8 md:mb-14">
      <p className="uppercase text-sm font-light">{subtitle}</p>
      <h2 className="tracking-wide capitalize text-4xl">{title}</h2>
    </header>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ProjectProps {
  id: string;
  title: string;
  thumbnail: ImageProps;
  technologies: TechnologyProps[];
  content: string;
  slug: string;
}

interface ImageProps {
  id: string;
  title: string | null;
  height: number | null;
  width: number | null;
  userId: string | null;
  imageUrl: string;
  description: string | null;
  publicId: string;
  tags: string[];
  blurDataUrl: string | null;
}

interface TechnologyProps {
  id: string;
  name: string;
}

export default function ProjectCard({
  index,
  project,
}: {
  index: number;
  project: ProjectProps;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group hover:shadow-lg duration-300 transition-all",
        index % 2 === 0 ? "md:translate-y-[150px]" : "md:translate-y-0"
      )}
    >
      <motion.div
        initial={{ y: 50, scale: 0.9 }}
        whileInView={{ y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className=" w-full aspect-square md:aspect-video rounded-lg overflow-hidden">
          <Image
            src={project.thumbnail.imageUrl || "/placeholder-image.jpg"}
            alt={project.title}
            width={project.thumbnail.width || 400}
            height={project.thumbnail.height || 400}
            placeholder="blur"
            blurDataURL={project.thumbnail.blurDataUrl || ""}
            className="w-full aspect-square md:aspect-video rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col py-4">
          <h3 className="mb-1 text-2xl capitalize">{project.title}</h3>
          <span className="">{project.technologies[0].name}</span>
        </div>
      </motion.div>
    </Link>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import placeholderImage from "@/lib/assets/images/placeholder.webp";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function ProjectCard({ index }: { index: number }) {
  return (
    <Link
      href={`/projects/slug`}
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
            src={placeholderImage.src}
            alt="product image"
            width={placeholderImage.width}
            height={placeholderImage.height}
            className="w-full aspect-square md:aspect-video rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col py-4">
          <h3 className="mb-1 text-2xl capitalize">Project Title</h3>
          <span className="">UX / UI design</span>
        </div>
      </motion.div>
    </Link>
  );
}

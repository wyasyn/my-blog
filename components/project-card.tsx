"use client";
import Image from "next/image";
import Link from "next/link";
import placeholderImage from "@/lib/assets/images/placeholder.webp";
import { motion } from "motion/react";

export default function ProjectCard() {
  return (
    <Link
      href={`/projects/slug`}
      className="group hover:shadow-lg duration-300 transition-all"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
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

"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import clockImage from "@/lib/assets/images/blog.gif";
import { cn } from "@/lib/utils";

export default function BlogCard({ index }: { index: number }) {
  return (
    <Link
      href={`/blog/slug`}
      className={cn(
        "group hover:shadow-lg duration-300 transition-all",
        index % 2 === 0 ? "md:translate-y-[150px]" : "md:translate-y-0"
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className=" w-full aspect-square md:aspect-video rounded-lg overflow-hidden">
          <Image
            src={clockImage.src}
            alt="product image"
            width={clockImage.width}
            height={clockImage.height}
            unoptimized
            className="w-full aspect-square md:aspect-video rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col py-4">
          <h3 className="mb-1 text-xl capitalize">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            reprehenderit dolorum facere inventore
          </h3>
          <span className="">February 18, 2025</span>
        </div>
      </motion.div>
    </Link>
  );
}

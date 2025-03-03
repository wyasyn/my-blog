"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn, formatDateString } from "@/lib/utils";

interface PostProps {
  id: string;
  title: string;
  content: string;
  slug: string;
  publishedAt: Date | null;
  thumbnail: {
    imageUrl: string;
    width?: number | null;
    height?: number | null;
    blurDataUrl: string | null;
  };
  tags: { id: string; name: string }[];
}

export default function BlogCard({
  index,
  post,
}: {
  index: number;
  post: PostProps;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
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
            src={post.thumbnail.imageUrl || "/placeholder-image.jpg"}
            alt={post.title}
            width={post.thumbnail.width || 400}
            height={post.thumbnail.height || 400}
            placeholder="blur"
            blurDataURL={post.thumbnail.blurDataUrl || ""}
            className="w-full aspect-square md:aspect-video rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col py-4">
          <h3 className="mb-1 text-xl capitalize">{post.title}</h3>
          <span className="">
            {formatDateString(post.publishedAt?.toISOString() || "")}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

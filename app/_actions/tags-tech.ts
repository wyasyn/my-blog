"use server";

import { prisma } from "@/lib/db";
import { cache } from "react";

export const getAllTags = cache(async () => {
  try {
    const tags = await prisma.tag.findMany();
    return { tags };
  } catch (error) {
    console.log(error);
  }
});

export const getTechnologies = cache(async () => {
  try {
    const technologies = await prisma.technology.findMany();
    return { technologies };
  } catch (error) {
    console.log(error);
  }
});

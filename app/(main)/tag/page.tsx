"use client";

import { useRouter } from "next/navigation";

export default function Tag() {
  const router = useRouter();
  router.back();
  return;
}

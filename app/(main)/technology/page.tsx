"use client";

import { useRouter } from "next/navigation";

export default function Technology() {
  const router = useRouter();
  router.back();
  return;
}

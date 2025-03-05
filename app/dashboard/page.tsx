import { Suspense } from "react";
import AdminDashboard from "./_component/admin-home";
import LoadingSkeleton from "@/components/loadingSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard ",
};

export default function DashboardHome() {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <AdminDashboard />
      </Suspense>
    </>
  );
}

import { Suspense } from "react";
import AdminDashboard from "./_component/admin-home";
import LoadingSkeleton from "@/components/loadingSkeleton";

export default function DashboardHome() {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <AdminDashboard />
      </Suspense>
    </>
  );
}

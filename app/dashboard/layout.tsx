import { auth } from "@/auth";
import DashboardNav from "./_component/dashboard-nav";
import { redirect } from "next/navigation";

const allowedEmail = process.env.EMAIL;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user === undefined) {
    redirect("/login");
  }

  if (!allowedEmail) {
    console.warn("Warning: Environment variable EMAIL is missing.");
  }

  if (session?.user?.email !== allowedEmail) {
    redirect("/unauthorized");
  }

  return (
    <main className="min-h-dvh p-3 md:py-20">
      <div className="flex flex-col gap-8 md:flex-row max-w-5xl mx-auto">
        <DashboardNav />
        <div className="border flex-1 rounded-lg h-full p-4 min-h-[700px]">
          {children}
        </div>
      </div>
    </main>
  );
}

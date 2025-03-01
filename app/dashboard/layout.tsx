import DashboardNav from "./_component/dashboard-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-dvh p-3 md:py-20">
      <div className="flex flex-col gap-8 md:flex-row max-w-5xl  mx-auto">
        <DashboardNav />
        <div className="border flex-1 rounded-lg h-full p-4 min-h-[700px]">
          {children}
        </div>
      </div>
    </main>
  );
}

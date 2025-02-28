import Navbar from "@/components/navbar";
import Shape from "@/components/shape";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" relative z-3 px-2 flex flex-col min-h-screen items-center ">
      <Navbar />
      <main className="wrapper flex-1 border mt-15 lg:mt-19">{children}</main>
      <footer className="mt-auto">footer</footer>
      <Shape />
    </div>
  );
}

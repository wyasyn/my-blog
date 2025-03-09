import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Shape from "@/components/shape";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" relative z-3 flex flex-col min-h-screen items-center ">
      <Navbar />
      <main className="wrapper flex-1 border-l border-r mt-15 lg:mt-19 relative z-2">
        {children}
      </main>
      <Footer />
      <Shape
        className="left-0 top-[250px] max-[1305px]:hidden"
        translate="-translate-x-1/2 w-[200px] 2xl:w-[300px]"
      />
      <Shape
        className="right-0 top-[100px] max-[1305px]:hidden"
        translate="translate-x-1/2 w-[200px] 2xl:w-[300px]"
      />
      <Shape
        className="right-0 top-[100px] md:hidden"
        translate="translate-x-1/2 w-[200px] sm:w-[300px]"
      />
    </div>
  );
}

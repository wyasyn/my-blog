import Hero from "@/components/homePage/hero";
import HomeBlog from "@/components/homePage/home-blog";
import SelectedWork from "@/components/homePage/selected-work";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <HomeBlog />
    </>
  );
}

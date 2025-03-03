import Hero from "@/components/homePage/hero";
import HomeBlog from "@/components/homePage/home-blog";
import SelectedWork from "@/components/homePage/selected-work";

type SearchParams = {
  searchParams: Promise<{ page: string }>;
};

export default async function HomePage({ searchParams }: SearchParams) {
  const { page } = await searchParams;
  const currentPage = parseInt(page ?? "1") || 1;
  return (
    <>
      <Hero />
      <SelectedWork currentPage={currentPage} />
      <HomeBlog />
    </>
  );
}

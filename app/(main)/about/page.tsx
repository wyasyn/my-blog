import AboutPageContent from "@/components/about-page.tsx/about";
import PageTitle from "@/components/page-title";

export default function AboutPage() {
  return (
    <>
      <PageTitle subtitle="learn more about me" title="about me" />
      <AboutPageContent />
    </>
  );
}

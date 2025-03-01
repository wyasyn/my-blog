import AboutPageContent from "@/components/aboutPage/about";
import PageTitle from "@/components/page-title";

export default function AboutPage() {
  return (
    <>
      <PageTitle
        subtitle="A glimpse into my journey, skills, and passion."
        title="about me"
      />
      <AboutPageContent />
    </>
  );
}

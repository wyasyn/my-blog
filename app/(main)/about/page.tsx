import AboutPageContent from "@/components/aboutPage/about";
import PageTitle from "@/components/page-title";
import { Metadata } from "next";
import personalPic from "@/lib/assets/images/hero.jpg";
import { socials } from "@/components/homePage/hero";
import { Person, WithContext } from "schema-dts";

// TODO: Install "schema-dts"

export const metadata: Metadata = {
  title: "About Me ",
};

const jsonLd: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yasin Walum",
  description:
    "I am a passionate computer scientist specializing in full-stack web development, mobile app development, data science, and cybersecurity. With a strong foundation in software engineering, I love solving complex problems and building scalable applications.",
  image: personalPic.src,
  url: "https://ywalum.com",
  sameAs: socials.map((link) => link.link),
  jobTitle: "Software Developer",
  homeLocation: "Kampala, Uganda",

  nationality: "Ugandan",

  gender: "Male",
};

export default function AboutPage() {
  return (
    <>
      <PageTitle
        subtitle="A glimpse into my journey, skills, and passion."
        title="about me"
      />
      <AboutPageContent />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

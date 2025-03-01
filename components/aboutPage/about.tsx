import Image from "next/image";
import profilePic from "@/lib/assets/images/hero.jpg";
import { Button } from "../ui/button";
import Link from "next/link";
import SkillsComponent from "./skills";
import Services from "./Services";
import SectionTitle from "../section-title";
import ProjectProcess from "../process";

export default function AboutPageContent() {
  return (
    <div>
      {/* About Section */}
      <section className="flex flex-col md:flex-row gap-12 mb-8">
        <div className="w-full aspect-square max-w-[400px] relative overflow-clip">
          <Image
            src={profilePic.src}
            width={profilePic.width}
            height={profilePic.height}
            alt="Profile"
            className="w-full h-full rounded-lg object-cover "
          />
          <div className="absolute inset-0 bg-radial dark:from-background/35 from-transparent to-75% to-background" />
        </div>

        <div>
          <h2>Hi, I&apos;m Yasin Walum! 👋</h2>
          <p className="mt-2 max-w-[40ch]">
            I&apos;m a software engineer passionate about full-stack
            development, data science, cybersecurity, and mobile apps. I love
            solving complex problems, building scalable solutions, and staying
            ahead of tech trends.
          </p>
          <p className="mt-2 max-w-[40ch]">
            Beyond coding, I enjoy reading, gaming, hiking, and movies. I
            started this blog to share my journey, insights, and projects—hoping
            to inspire and help others. Feel free to connect—I’d love to hear
            from you! 🚀
          </p>
        </div>
      </section>

      {/* Skills / Experience */}
      <section className="md:py-20 py-14">
        <SectionTitle
          title="My Skills & Expertise"
          subtitle="Technologies & Tools"
        />

        <SkillsComponent />
      </section>

      <Services />
      <ProjectProcess />

      {/* Call to Action */}
      <section className="text-center py-14 md:py-20">
        <p className="text-foreground">Want to collaborate or work together?</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/contact">Contact Me</Link>
        </Button>
      </section>
    </div>
  );
}

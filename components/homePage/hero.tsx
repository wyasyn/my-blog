import { BsTwitterX } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import { PiGithubLogoBold } from "react-icons/pi";
import { IoMailOutline } from "react-icons/io5";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { GithubGlobe } from "./globe-demo";

const email = process.env.EMAIL;

const socials = [
  {
    name: "GitHub",
    icon: <PiGithubLogoBold />,
    link: "https://github.com/wyasyn",
  },
  {
    name: "LinkedIn",
    icon: <AiFillLinkedin />,
    link: "https://www.linkedin.com/in/yasin-walum",
  },
  {
    name: "Twitter",
    icon: <BsTwitterX />,
    link: "https://x.com/wyasyn",
  },
  {
    name: "Gmail",
    icon: <IoMailOutline />,
    link: `mailto:${email}`,
  },
];

export default function Hero() {
  return (
    <section className="grid gap-12 md:grid-cols-2 md:items-end ">
      <div className=" pt-14 md:pt-24 ">
        <h1 className="text-balance dark:text-orange-200 text-5xl sm:text-7xl lg:text-9xl font-thin">
          Yasin <br /> Walum.
        </h1>
        <h2 className=" max-sm:text-xl font-mono text-muted-foreground mt-4 lg:ml-8 md:mt-5">
          Software Engineer
        </h2>
        <div className="flex gap-4 mt-8 lg:ml-8">
          {socials.map(({ name, icon, link }) => (
            <Button key={name} asChild variant="outline" size="icon">
              <Link href={link} target="_blank" rel="noopener noreferrer">
                {icon}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className=" h-full flex items-end relative">
        <GithubGlobe />
        <div className="md:absolute md:bottom-0 md:left-0 md:w-full md:bg-gradient-to-t md:from-background md:to-transparent md:p-4">
          <p className="max-w-[50ch] ">
            Computer Scientist specializing in Web Development, AI, Machine
            Learning, Data Science, and Software Development.
          </p>
        </div>
      </div>
    </section>
  );
}

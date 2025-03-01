import Image from "next/image";
import profilePic from "@/lib/assets/images/hero.jpg";

export default function AboutPageContent() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Hero Section */}
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold">About Me</h1>
        <p className="text-gray-600 mt-2">
          A glimpse into my journey, skills, and passion.
        </p>
      </section>

      {/* About Section */}
      <section className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <Image
          src={profilePic.src}
          width={profilePic.width}
          height={profilePic.height}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-semibold">
            Hi, I&apos;m Yasin Walum! 👋
          </h2>
          <p className="text-gray-700 mt-2">
            I&apos;m a software engineer and tech enthusiast with expertise in
            full-stack web development, data science, cybersecurity, and mobile
            app development. I thrive on solving complex problems, building
            scalable solutions, and staying ahead of emerging technologies.
          </p>
        </div>
      </section>

      {/* Skills / Experience */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">My Skills</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-800">
          <li>React & Next.js</li>
          <li>Node.js & Express</li>
          <li>Python & Django</li>
          <li>Docker & Kubernetes</li>
          <li>Machine Learning</li>
          <li>Flutter & Android</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-6">
        <p className="text-gray-700">Want to collaborate or work together?</p>
        <a
          href="/contact"
          className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Contact Me
        </a>
      </section>
    </div>
  );
}

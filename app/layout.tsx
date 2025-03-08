import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ChatbotProvider } from "@/providers/chatbot-provider";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const playfair = localFont({
  src: "../lib/assets/fonts/PlayfairDisplay.ttf",
  display: "swap",
  variable: "--font-play-fair",
});
const inter = localFont({
  src: "../lib/assets/fonts/Inter.ttf",
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template:
      "%s - Yasin Walum | Software Developer, Machine Learning & Data Science Specialist",
    default:
      "Yasin Walum | Software Developer, Machine Learning & Data Science Specialist",
  },
  description:
    "Explore the portfolio of Yasin Walum, a skilled software developer specializing in full-stack development, machine learning, and data science. Discover innovative projects, professional experience, and technical expertise in cutting-edge technologies like Python, React, Docker, and more.",
  keywords: [
    "Computer Scientist Portfolio",
    "Professional Portfolio Website",
    "Software Developer Portfolio",
    "AI and Machine Learning Expert",
    "Full-Stack Web Developer",
    "Mobile App Developer",
    "Data Science Expert",
    "Full-Stack Developer",
    "Cybersecurity Specialist",
    "Docker Projects",
    "React.js Developer Portfolio",
    "Next.js Developer Portfolio",
    "Flutter App Developer",
    "Android Studio Developer",
    "Python Developer",
    "JavaScript Developer",
    "Remix Developer",
    "FastAPI Developer",
    "Django Expert",
    "Flask Projects",
    "TailwindCSS Portfolio",
    "Material UI Designs",
    "Laravel Developer",
    "Node.js Developer",
    "Express.js Developer",
    "Python Portfolio",
    "Java Projects",
    "TypeScript Portfolio",
    "Kotlin Developer",
    "Dart Mobile Apps",
    "GoLang Developer",
    "Adaptive Developer",
    "Fast Learner in Tech",
    "Innovative Software Solutions",
    "Creative Tech Projects",
    "Efficient Problem Solver",
    "AI-Powered Solutions",
    "Machine Learning Projects",
    "Cybersecurity Innovations",
    "Cutting-Edge Web Development",
    "Mobile-First Design",
    "Kampala/Uganda Computer Scientist",
    "Kampala/Uganda Full-Stack Developer",
    "Interactive Developer Portfolio",
    "Innovative App Designs",
    "Showcase of Development Skills",
    "Live Projects Portfolio",
    "Personal Tech Blog",
  ],
  openGraph: {
    type: "website",
    url: baseUrl,
    siteName: "Yasin Walum",
    title:
      "Yasin Walum | Software Developer, Machine Learning & Data Science Specialist",
    description:
      "Explore the portfolio of Yasin Walum, a skilled software developer specializing in full-stack development, machine learning, and data science. Discover innovative projects, professional experience, and technical expertise in cutting-edge technologies like Python, React, Docker, and more.",
    images: [
      {
        url: "https://res.cloudinary.com/dkdteb9m5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1731179025/personal%20finance/lj5hjqhmvaeqdsrfcwky.jpg",
        width: 1200,
        height: 630,
        alt: "Yasin Walum",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ChatbotProvider>
            {children}
            <Toaster />
          </ChatbotProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

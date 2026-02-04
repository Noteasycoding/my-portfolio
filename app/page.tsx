"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Cpu,
  Database,
  Layers,
  Menu,
  HomeIcon,
  User,
  Briefcase,
  MessageSquare,
  Quote
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { NavigationMenu } from "@/components/navigation-menu";
import { ProjectsSection, type Project } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { StatsSection } from "@/components/stats-section";
import { HeroSection } from "@/components/hero-section";
import { LoadingAnimation } from "@/components/loading";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

/* ------------------ DATA ------------------ */

const about = {
  title: "About Me",
  description: `Hi, I'm Zahiruddin (Zaheer Khan), a passionate Full-Stack Developer and Software Engineer at TrackNab. With expertise in React Native, JavaScript, Node.js, Express, and the MERN stack, I specialize in building scalable and high-performance web and mobile applications.`
};

const projects: Project[] = [
  {
    title: "Superfast5G",
    type: "Mobile App",
    tech: "React Native + Firebase",
    description: [
      "Live production mobile application published on Google Play Store",
      "Allows users to view active plans, track data usage, and recharge online",
      "Includes admin controls for user management and recharge tracking"
    ],
    image:
      "https://play-lh.googleusercontent.com/f8NgMxdybOu-PMu06zNU26JYOJfwbBlgKqHax61peNVZDC1lhOYGydbv6jSf79tlZA=w5120-h2880-rw",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.superfast5g"
  },
  {
    title: "StockTrack",
    type: "Mobile App",
    tech: "React Native + Firebase",
    description: [
      "Built an inventory tracking mobile application for businesses",
      "Features product catalog, stock level alerts, and cloud-based database management",
      "Used Firebase Firestore for real-time database sync"
    ],
    image:
      "https://cdn.dribbble.com/userupload/17119217/file/original-5255cb6170c8dd1c60718e1ea8f07495.png?resize=3200x2400&vertical=center",
    github: "https://github.com/Noteasycoding/StockTrack"
  },
  {
    title: "Netflix Clone",
    type: "Website",
    tech: "MERN Stack",
    description: [
      "Developed a Netflix-inspired streaming platform using React.js, Node.js, Express.js, and MongoDB",
      "Implemented user authentication, movie database, and responsive UI",
      "Used JWT for secure authentication and Redux for state management"
    ],
    image:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=400&fit=crop",
    github: "https://github.com/Noteasycoding/NetflixClone",

  },

];


const experience = [
  {
    title: "Software Engineer",
    company: "TrackNab",
    period: "Mar 2024 - Present",
    location: "Dubai, UAE (Remote)",
    description: [
      "Developing cross-platform mobile applications using React Native",
      "Improving application performance and state management",
      "Collaborating with backend teams for API integrations"
    ],
    icon: Cpu
  },
  {
    title: "Freelance Software Engineer",
    company: "Self-employed",
    period: "Jul 2023 - Mar 2024",
    location: "Remote",
    description: [
      "Built and deployed multiple React.js applications",
      "Developed full-stack applications using the MERN stack"
    ],
    icon: Code
  },
  {
    title: "Web Content Uploader",
    company: "Collegedunia",
    period: "Nov 2022 - Mar 2024",
    location: "Gurugram, India",
    description: ["Managed web content and worked with HTML & CSS"],
    icon: Layers
  },
  {
    title: "Python Developer Intern",
    company: "CETPA Infotech",
    period: "Jun 2021 - Aug 2021",
    location: "Noida, India",
    description: ["Developed Python applications using OOP principles"],
    icon: Database
  }
];

/* ------------------ PAGE ------------------ */

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    const offset = 80;
    window.scrollTo({
      top: section.offsetTop - offset,
      behavior: "smooth"
    });

    setIsOpen(false);
  };

  return (
    <AnimatePresence mode="sync">
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="min-h-screen bg-background"
        >
          {/* NAVBAR */}
          <nav className="fixed w-full z-50 bg-background/80 backdrop-blur border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">Zaheer Khan</h1>

              <div className="flex items-center gap-4">
                <NavigationMenu />

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Navigation</SheetTitle>
                      <SheetDescription>
                        Jump to any section
                      </SheetDescription>
                    </SheetHeader>

                    <nav className="mt-6 flex flex-col gap-3">
                      {[
                        { id: "hero", label: "Home", icon: HomeIcon },
                        { id: "about", label: "About", icon: User },
                        { id: "experience", label: "Experience", icon: Briefcase },
                        { id: "projects", label: "Projects", icon: Code },
                        { id: "testimonials", label: "Testimonials", icon: Quote },
                        { id: "contact", label: "Contact", icon: MessageSquare }
                      ].map((item) => (
                        <Button
                          key={item.id}
                          variant="ghost"
                          className="justify-start gap-2"
                          onClick={() => scrollToSection(item.id)}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Button>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>

                <ThemeToggle />
              </div>
            </div>
          </nav>

          {/* SECTIONS */}
          <section id="hero">
            <HeroSection
              imageUrl="https://media.licdn.com/dms/image/v2/D5603AQFpsGvZSYGrUA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1711989143607"
              name="Zahiruddin (Zaheer Khan)"
              description="A Passionate Full Stack Developer specializing in React Native, MERN Stack, and scalable applications."
              resumeUrl="https://drive.google.com/uc?export=download&id=1e-6iIgOBnnoa7JbF3RAuTPOP0d1DcS0O"
            />
          </section>

          <StatsSection />

          <section id="about">
            <AboutSection {...about} />
          </section>

          <section id="experience">
            <ExperienceSection experience={experience} />
          </section>

          <section id="projects">
            <ProjectsSection projects={projects} />
          </section>

          <section id="contact">
            <ContactSection
              email="zaheer.khan9147@gmail.com"
              linkedin="https://www.linkedin.com/in/zahiruddin-khan-8b79a4203"
              github="https://github.com/Noteasycoding"
            />
          </section>

          <footer className="py-8 border-t text-center text-muted-foreground">
            © 2026 Zahiruddin Khan. All rights reserved.
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
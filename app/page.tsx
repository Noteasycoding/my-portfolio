"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Code,
  Cpu,
  Database,
  Layers,
} from "lucide-react";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { StatsSection } from "@/components/stats-section";
import { HeroSection } from "@/components/hero-section";

const about =
{
  title: "About Me",
  description: `Hi, I'm Zahiruddin (Zaheer Khan), a passionate Full-Stack Developer and Software Engineer at TrackNab. With expertise in React Native, JavaScript, Node.js, Express, and the MERN stack, I specialize in building scalable and high-performance web and mobile applications`
}

const projects = [
  {
    title: "Netflix Clone",
    tech: "MERN Stack",
    description: [
      "Developed a Netflix-inspired streaming platform using React.js, Node.js, Express.js, and MongoDB",
      "Implemented user authentication, movie database, and responsive UI",
      "Used JWT for secure authentication and Redux for state management"
    ],
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=400&fit=crop",
    link: "https://github.com/Noteasycoding/NetflixClone"
  },
  {
    title: "StockTrack",
    tech: "React Native + Firebase",
    description: [
      "Built an inventory tracking mobile application for businesses",
      "Features product catalog, stock level alerts, and cloud-based database management",
      "Used Firebase Firestore for real-time database sync"
    ],
    image: "https://cdn.dribbble.com/userupload/17119217/file/original-5255cb6170c8dd1c60718e1ea8f07495.png?resize=3200x2400&vertical=center",
    link: "https://github.com/Noteasycoding/StockTrack"
  }
]

const experience = [
  {
    title: "Software Engineer",
    company: "TrackNab",
    period: "Mar 2024 - Present",
    location: "Doha, Qatar (Remote)",
    description: [
      "Developing cross-platform mobile applications using React Native and Redux.js",
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
    description: [
      "Managed web content and worked with CSS, HTML5"
    ],
    icon: Layers
  },
  {
    title: "Python Developer Intern",
    company: "CETPA Infotech",
    period: "Jun 2021 - Aug 2021",
    location: "Noida, India",
    description: [
      "Developed Python-based applications with OOP principles"
    ],
    icon: Database
  }
]

export default function Home() {

  return (
    <div className="min-h-screen bg-background">

      {/* Navigation */}
      <nav className="fixed w-full bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1
            className="text-xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Zaheer Khan
          </motion.h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection
        imageUrl="https://media.licdn.com/dms/image/v2/D5603AQFpsGvZSYGrUA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1711989143607?e=1746057600&v=beta&t=aoSBiiag-wTs197UKcU0MYE6SkC62SumnaRwdDGmbg0"
        name="Zahiruddin (Zaheer Khan)"
        description="A Passionate Full Stack Developer 🚀 specializing in React Native, MERN Stack, and Scalable Applications."
        resumeUrl="https://drive.google.com/uc?export=download&id=1e-6iIgOBnnoa7JbF3RAuTPOP0d1DcS0O"
      />

      {/* Stats Section */}
      <StatsSection />

      {/* About Section */}
      <AboutSection title={about.title} description={about.description} />

      {/* Experience Section */}
      <ExperienceSection experience={experience} />

      {/* Projects Section */}
      <ProjectsSection projects={projects} />

      {/* Contact Section */}
      <ContactSection
        email="zaheer.khan9147@gmail.com"
        linkedin="https://www.linkedin.com/in/zahiruddin-khan-8b79a4203"
        github="https://github.com/Noteasycoding"
      />

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Zahiruddin Khan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
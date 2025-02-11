"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { SkillProgress } from "@/components/skill-progress";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Briefcase,
  Code,
  User,
  MessageSquare,
  Terminal,
  Cpu,
  Database,
  Layers,
  GitBranch,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* 3D Background Scene */}

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
      <section className="pt-32 pb-16 px-4 relative">
        <div className="container mx-auto">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <div className="w-48 h-48 rounded-full overflow-hidden relative group">
              <motion.div
                className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
                  alt="Zahiruddin Khan"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hi, I'm Zahiruddin (Zaheer Khan) 👋
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                A Passionate Full Stack Developer 🚀 specializing in React Native, MERN Stack, and Scalable Applications.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a href="https://drive.google.com/uc?export=download&id=1e-6iIgOBnnoa7JbF3RAuTPOP0d1DcS0O" target="_blank" rel="noopener noreferrer" download="Zaheer_Khan_Resume.pdf">
                  <Button>
                    <Download className="mr-2 h-4 w-4" /> Download Resume
                  </Button>
                </a>
                <Button
                  variant="secondary"
                  onClick={() => {
                    const projectsSection = document.querySelector('#projects');
                    projectsSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Code className="mr-2 h-4 w-4" /> View Projects
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const contactSection = document.querySelector('#contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <MessageSquare className="mr-2 h-4 w-4" /> Get in Touch
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/contact')}
                >
                  <MessageSquare className="mr-2 h-4 w-4" /> Contact
                </Button>
                <Link href="/about">
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" /> About
                  </Button>
                </Link>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {[
              { icon: Code, label: "Projects Completed", value: "50+" },
              { icon: GitBranch, label: "Git Commits", value: "1,200+" },
              { icon: Terminal, label: "Lines of Code", value: "100K+" },
              { icon: MessageSquare, label: "Client Reviews", value: "30+" },
            ].map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={statsInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.1 }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <User className="mr-2" /> About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <p className="text-lg">
                  I'm a Software Engineer at TrackNab with experience in full-stack web and mobile development.
                  I love solving complex problems, building scalable applications, and staying up to date with
                  the latest technologies.
                </p>
              </Card>
              <Card className="p-6 space-y-4">
                <h3 className="text-xl font-semibold mb-4">Skills</h3>
                <SkillProgress skill="React & React Native" progress={90} delay={0} />
                <SkillProgress skill="Node.js & Express" progress={85} delay={200} />
                <SkillProgress skill="MongoDB & SQL" progress={80} delay={400} />
                <SkillProgress skill="TypeScript" progress={88} delay={600} />
                <SkillProgress skill="DevOps & Cloud" progress={75} delay={800} />
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <Briefcase className="mr-2" /> Experience
            </h2>
            <div className="space-y-8">
              {[
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
              ].map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <job.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p className="text-muted-foreground">{job.company}</p>
                        <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
                          <span>{job.period}</span>
                          <span>•</span>
                          <span>{job.location}</span>
                        </div>
                        <ul className="mt-4 space-y-2">
                          {job.description.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <Code className="mr-2" /> Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
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
                  image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=400&fit=crop",
                  link: "https://github.com/Noteasycoding/StockTrack"
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="overflow-hidden group">
                    <div className="relative h-48">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex gap-2">
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <Button variant="secondary" size="sm">
                              <Github className="mr-2 h-4 w-4" /> View Code
                            </Button>
                          </a>
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <Button variant="secondary" size="sm">
                              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.tech}</p>
                      <ul className="space-y-2">
                        {project.description.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <MessageSquare className="mr-2" /> Get in Touch
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:zaheer.khan9147@gmail.com">
                <Button variant="outline" className="min-w-[200px]">
                  <Mail className="mr-2 h-4 w-4" /> Email Me
                </Button>
              </a>
              <a
                href="https://www.linkedin.com/in/zahiruddin-khan-8b79a4203"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="min-w-[200px]">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </Button>
              </a>
              <a
                href="https://github.com/Noteasycoding"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="min-w-[200px]">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Zahiruddin Khan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
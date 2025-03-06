"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Code } from "lucide-react";

interface Project {
    title: string;
    tech: string;
    description: string[];
    image: string;
    link: string;
}

interface ProjectsSectionProps {
    projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
    return (
        <section id="projects" className="py-20 bg-gradient-to-b from-muted/50 to-background">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-bold mb-12 flex items-center">
                        <Code className="mr-3 w-8 h-8" /> My Projects
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 border border-muted/20">
                                    <div className="relative h-56">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <div className="flex gap-3">
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:-translate-y-1 transition-transform">
                                                    <Button variant="secondary" size="sm" className="gap-2">
                                                        <Github className="h-4 w-4" /> Code
                                                    </Button>
                                                </a>
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:-translate-y-1 transition-transform">
                                                    <Button variant="default" size="sm" className="gap-2">
                                                        <ExternalLink className="h-4 w-4" /> Demo
                                                    </Button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-2xl font-bold">{project.title}</h3>
                                            <span className="text-sm px-3 py-1 rounded-full bg-muted/50 text-muted-foreground">
                                                {project.tech}
                                            </span>
                                        </div>
                                        <ul className="space-y-2.5 text-muted-foreground">
                                            {project.description.map((item, i) => (
                                                <li key={i} className="flex items-start">
                                                    <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-muted-foreground rounded-full"></span>
                                                    {item}
                                                </li>
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
    );
} 
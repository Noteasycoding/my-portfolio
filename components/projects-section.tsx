"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';

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
    const [selectedTech, setSelectedTech] = useState<string | null>(null);

    const technologies = Array.from(
        new Set(projects.map((project) => project.tech))
    );

    const filteredProjects = selectedTech
        ? projects.filter((project) => project.tech === selectedTech)
        : projects;

    // Generate structured data for projects
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": projects.map((project, index) => ({
            "@type": "SoftwareSourceCode",
            "position": index + 1,
            "name": project.title,
            "programmingLanguage": project.tech,
            "description": project.description.join(" "),
            "codeRepository": project.link
        }))
    };

    return (
        <>
            <Script id="projects-structured-data" type="application/ld+json">
                {JSON.stringify(structuredData)}
            </Script>
            <section id="projects" className="py-20 bg-gradient-to-b from-muted/50 to-background">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl font-bold mb-8 flex items-center">
                            <Code className="mr-3 w-8 h-8" /> My Projects
                        </h2>

                        <div className="flex flex-wrap gap-2 mb-8">
                            <Button
                                variant={selectedTech === null ? "default" : "outline"}
                                onClick={() => setSelectedTech(null)}
                                className="rounded-full"
                            >
                                All
                            </Button>
                            {technologies.map((tech) => (
                                <Button
                                    key={tech}
                                    variant={selectedTech === tech ? "default" : "outline"}
                                    onClick={() => setSelectedTech(tech)}
                                    className="rounded-full"
                                >
                                    {tech}
                                </Button>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <AnimatePresence mode="sync">
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.title}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="overflow-hidden h-full">
                                            <div className="relative h-48">
                                                <Image
                                                    src={project.image}
                                                    alt={`${project.title} - ${project.tech} project screenshot`}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                                <p className="text-sm text-muted-foreground mb-4">{project.tech}</p>
                                                <ul className="space-y-2 mb-4" aria-label={`${project.title} features`}>
                                                    {project.description.map((item, i) => (
                                                        <li key={i} className="text-sm text-muted-foreground">
                                                            • {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center"
                                                    aria-label={`View ${project.title} project on GitHub`}
                                                >
                                                    <Button variant="outline" className="gap-2">
                                                        View Project <ExternalLink className="h-4 w-4" />
                                                    </Button>
                                                </a>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
} 
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, ExternalLink, Github, ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import Script from "next/script";

export interface Project {
    title: string;
    type: "Website" | "Mobile App";
    tech: string;
    description: string[];
    image: string;
    playStoreLink?: string;
    github?: string;
    tags?: string[];
}

interface ProjectsSectionProps {
    projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
    const [selectedTech, setSelectedTech] = useState<string | null>(null);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    const technologies = Array.from(
        new Set(projects.map((project) => project.tech))
    );

    const filteredProjects = selectedTech
        ? projects.filter((project) => project.tech === selectedTech)
        : projects;

    // Structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: projects.map((project, index) => ({
            "@type": "SoftwareSourceCode",
            position: index + 1,
            name: project.title,
            programmingLanguage: project.tech,
            description: project.description.join(" "),
            codeRepository: project.playStoreLink
        }))
    };

    return (
        <>
            <Script id="projects-structured-data" type="application/ld+json">
                {JSON.stringify(structuredData)}
            </Script>

            <section className="py-16 bg-muted/50" >
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Section Heading */}
                        <h2 className="text-3xl font-bold mb-8 flex items-center">
                            <Code className="mr-3 w-8 h-8" />
                            Featured Projects
                        </h2>


                        {/* Tech Filters */}
                        <div className="flex flex-wrap gap-3 mb-12">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant={selectedTech === null ? "default" : "outline"}
                                    onClick={() => setSelectedTech(null)}
                                    className="rounded-full font-medium shadow-sm hover:shadow-md transition-all"
                                    size="lg"
                                >
                                    All Projects
                                    <Badge variant="secondary" className="ml-2 rounded-full">
                                        {projects.length}
                                    </Badge>
                                </Button>
                            </motion.div>

                            {technologies.map((tech) => {
                                const count = projects.filter(p => p.tech === tech).length;
                                return (
                                    <motion.div
                                        key={tech}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            variant={selectedTech === tech ? "default" : "outline"}
                                            onClick={() => setSelectedTech(tech)}
                                            className="rounded-full font-medium shadow-sm hover:shadow-md transition-all"
                                            size="lg"
                                        >
                                            {tech}
                                            <Badge variant="secondary" className="ml-2 rounded-full">
                                                {count}
                                            </Badge>
                                        </Button>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Projects Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.title}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                            layout: { duration: 0.3 }
                                        }}
                                        onHoverStart={() => setHoveredProject(project.title)}
                                        onHoverEnd={() => setHoveredProject(null)}
                                    >
                                        <Card className="group overflow-hidden flex flex-col border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 bg-card/50 backdrop-blur-sm">
                                            {/* Image Section */}
                                            <div
                                                className={`relative overflow-hidden flex-shrink-0 h-[400px] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center`}
                                            >
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                />

                                                <motion.div
                                                    animate={{
                                                        scale: hoveredProject === project.title ? 1.1 : 1,
                                                    }}
                                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                                    className="w-full h-full flex items-center justify-center"
                                                >
                                                    <Image
                                                        src={project.image}
                                                        alt={`${project.title} - ${project.tech} project screenshot`}
                                                        width={project.type === "Mobile App" ? 300 : 800}
                                                        height={project.type === "Mobile App" ? 400 : 224}
                                                        className={
                                                            project.type === "Mobile App"
                                                                ? "object-contain drop-shadow-2xl max-h-full w-auto"
                                                                : "object-cover w-full h-full"
                                                        }
                                                        priority={index < 2}
                                                    />
                                                </motion.div>

                                                {/* Project Type Badge */}
                                                <div className="absolute top-4 right-4 z-20">
                                                    <Badge className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold border-2 border-slate-200 dark:border-slate-700 shadow-lg px-3 py-1">
                                                        {project.type}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* Content - This will push to bottom with mt-auto */}
                                            <div className="p-6 space-y-4 mt-auto">
                                                {/* Title and Tech */}
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                                                        {project.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="font-mono text-xs">
                                                            {project.tech}
                                                        </Badge>
                                                        {project.tags?.map((tag) => (
                                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <ul
                                                    className="space-y-2"
                                                    aria-label={`${project.title} features`}
                                                >
                                                    {project.description.map((item, i) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                            className="flex items-start gap-2 text-sm text-muted-foreground"
                                                        >
                                                            <span className="text-primary mt-1 flex-shrink-0">▸</span>
                                                            <span>{item}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>

                                                {/* Action Buttons */}
                                                <div className="flex gap-3 pt-2">
                                                    {project.playStoreLink && <a
                                                        href={project.playStoreLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`View ${project.title} project`}
                                                        className="flex-1"
                                                    >
                                                        <Button
                                                            className="w-full gap-2 group/btn shadow-md hover:shadow-lg transition-all"
                                                            size="lg"
                                                        >
                                                            <Play className="h-4 w-4" />
                                                            Open on Playstore
                                                            <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                        </Button>
                                                    </a>}

                                                    {project.github && (
                                                        <a
                                                            href={project.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label={`View ${project.title} on GitHub`}
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                size="lg"
                                                                className="gap-2 shadow-sm hover:shadow-md transition-all"
                                                            >
                                                                Open Github Repo
                                                                <Github className="h-4 w-4" />
                                                            </Button>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Empty State */}
                        {filteredProjects.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20"
                            >
                                <Code className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                                <h3 className="text-2xl font-semibold mb-2">No projects found</h3>
                                <p className="text-muted-foreground">
                                    Try selecting a different technology filter
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>
        </>
    );
}

"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

interface Experience {
    title: string;
    company: string;
    period: string;
    location: string;
    description: string[];
    icon: React.ComponentType<{ className?: string }>;
}

interface ExperienceSectionProps {
    experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
    return (
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
                        {experience.map((job, index) => (
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
    );
} 
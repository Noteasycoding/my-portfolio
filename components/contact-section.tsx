"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, MessageSquare } from "lucide-react";

interface ContactSectionProps {
    email: string;
    linkedin: string;
    github: string;
}

export function ContactSection({ email, linkedin, github }: ContactSectionProps) {
    return (
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
                        <a href={`mailto:${email}`}>
                            <Button variant="outline" className="min-w-[200px]">
                                <Mail className="mr-2 h-4 w-4" /> Email Me
                            </Button>
                        </a>
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="outline" className="min-w-[200px]">
                                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                            </Button>
                        </a>
                        <a
                            href={github}
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
    );
} 
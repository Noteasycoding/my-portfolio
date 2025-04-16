"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, MessageSquare } from "lucide-react";
import { ContactForm } from './contact-form';
import { Card } from './ui/card';

interface ContactSectionProps {
    email: string;
    linkedin: string;
    github: string;
}

export function ContactSection({ email, linkedin, github }: ContactSectionProps) {
    return (
        <section id="contact" className="py-20 bg-muted/30">
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
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="p-6">
                            <h3 className="text-xl font-semibold mb-4">Send me a message</h3>
                            <ContactForm />
                        </Card>
                        <Card className="p-6">
                            <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                            <p className="text-muted-foreground mb-6">
                                Feel free to reach out through any of these platforms. I'm always open to discussing new projects, creative ideas, or opportunities.
                            </p>
                            <div className="space-y-4">
                                <a href={`mailto:${email}`} className="block">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Mail className="mr-2 h-4 w-4" /> {email}
                                    </Button>
                                </a>
                                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="block">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Linkedin className="mr-2 h-4 w-4" /> LinkedIn Profile
                                    </Button>
                                </a>
                                <a href={github} target="_blank" rel="noopener noreferrer" className="block">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Github className="mr-2 h-4 w-4" /> GitHub Profile
                                    </Button>
                                </a>
                            </div>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 
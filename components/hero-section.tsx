"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Code, MessageSquare } from "lucide-react";
import Image from 'next/image';

interface HeroSectionProps {
    imageUrl: string;
    name: string;
    description: string;
    resumeUrl: string;
}

export function HeroSection({ imageUrl, name, description, resumeUrl }: HeroSectionProps) {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <section className="pt-32 pb-16 relative">
            <div className="container mx-auto">
                <motion.div
                    className="flex flex-col md:flex-row items-center gap-8"
                    initial="initial"
                    animate="animate"
                    variants={fadeIn}
                >
                    <div className="w-48 h-48 rounded-full overflow-hidden relative group">
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Image
                                src={imageUrl}
                                alt={`${name} - Full Stack Developer specializing in React Native and MERN Stack`}
                                fill
                                priority
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Hi, I'm {name} 👋
                        </h1>
                        <p className="text-xl text-muted-foreground mb-6">
                            {description}
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download="Zaheer_Khan_Resume.pdf">
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
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 
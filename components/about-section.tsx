"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SkillProgress } from "@/components/skill-progress";
import { User } from "lucide-react";

interface AboutSectionProps {
    title: string;
    description: string;
}

export function AboutSection({ title, description }: AboutSectionProps) {
    return (
        <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-8 flex items-center">
                        <User className="mr-2" /> {title}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="p-6">
                            <p className="text-lg">{description}</p>
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
    );
} 
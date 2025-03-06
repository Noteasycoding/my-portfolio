"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Code, GitBranch, Terminal, MessageSquare } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface StatItem {
    icon: any;
    label: string;
    value: string;
}

export function StatsSection() {
    const { ref: statsRef, inView: statsInView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const stats: StatItem[] = [
        { icon: Code, label: "Projects Completed", value: "20+" },
        { icon: GitBranch, label: "Git Commits", value: "1,200+" },
        { icon: Terminal, label: "Lines of Code", value: "100K+" },
        { icon: MessageSquare, label: "Client Reviews", value: "30+" },
    ];

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={statsRef}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={statsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, staggerChildren: 0.1 }}
                >
                    {stats.map((stat, index) => (
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
    );
} 
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    image: string;
    content: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "John Doe",
        role: "Project Manager",
        company: "Tech Corp",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        content: "Zaheer is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are remarkable."
    },
    {
        id: 2,
        name: "Jane Smith",
        role: "CEO",
        company: "Digital Solutions",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
        content: "Working with Zaheer was a great experience. He brought innovative solutions to our project and was always professional and responsive."
    },
    {
        id: 3,
        name: "Mike Johnson",
        role: "Tech Lead",
        company: "Innovation Labs",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        content: "Zaheer's expertise in React Native and the MERN stack helped us deliver a complex project ahead of schedule. His technical skills are top-notch."
    }
];

export function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-8 flex items-center">
                        <Quote className="mr-2" /> Testimonials
                    </h2>
                    <div className="relative">
                        <Card className="p-6 md:p-8">
                            <AnimatePresence mode="sync">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col items-center text-center"
                                >
                                    <Avatar className="w-20 h-20 mb-4">
                                        <AvatarImage src={testimonials[currentIndex].image} />
                                        <AvatarFallback>{testimonials[currentIndex].name[0]}</AvatarFallback>
                                    </Avatar>
                                    <p className="text-lg mb-6 italic">"{testimonials[currentIndex].content}"</p>
                                    <div>
                                        <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </Card>
                        <div className="flex justify-center gap-4 mt-6">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={prev}
                                className="rounded-full"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={next}
                                className="rounded-full"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 
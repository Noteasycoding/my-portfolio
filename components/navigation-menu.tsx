'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
];

export function NavigationMenu() {
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        document.querySelectorAll('section[id]').forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const navHeight = 80; // Height of your fixed navigation bar
            const sectionTop = section.offsetTop - navHeight;
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
                <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                        'text-sm font-medium transition-colors',
                        activeSection === item.id
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-primary'
                    )}
                    onClick={() => scrollToSection(item.id)}
                >
                    {item.label}
                </motion.button>
            ))}
        </nav>
    );
} 
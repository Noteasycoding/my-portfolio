'use client';

import { motion } from 'framer-motion';

export function LoadingAnimation() {
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="w-4 h-4 rounded-full bg-primary"
                    animate={{
                        y: [-10, 0, -10],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: 0,
                    }}
                />
                <motion.div
                    className="w-4 h-4 rounded-full bg-primary"
                    animate={{
                        y: [-10, 0, -10],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: 0.2,
                    }}
                />
                <motion.div
                    className="w-4 h-4 rounded-full bg-primary"
                    animate={{
                        y: [-10, 0, -10],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: 0.4,
                    }}
                />
            </motion.div>
        </div>
    );
} 
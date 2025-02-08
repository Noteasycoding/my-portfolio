"use client";

import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface SkillProgressProps {
  skill: string;
  progress: number;
  delay?: number;
}

export function SkillProgress({ skill, progress, delay = 0 }: SkillProgressProps) {
  const [value, setValue] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => setValue(progress), delay);
    }
  }, [inView, progress, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span>{skill}</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </motion.div>
  );
}
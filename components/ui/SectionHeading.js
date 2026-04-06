"use client";

import { motion } from "framer-motion";
import { useScrollReady } from "@/hooks/useScrollReady";

export default function SectionHeading({ children, className = "", center = false }) {
    const ready = useScrollReady(500);

    return (
        <div className={`flex ${center ? "justify-center" : "justify-start"} ${className}`}>
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={ready ? { opacity: 1, x: 0 } : undefined}
                viewport={ready ? { once: true, amount: 0.2 } : undefined}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative inline-block mb-6 group"
            >
                <h2 className="text-4xl md:text-5xl relative z-10 text-brand-dark">
                    {children}
                </h2>
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={ready ? { width: "100%" } : undefined}
                    viewport={ready ? { once: true, amount: 0.2 } : undefined}
                    transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                    className="absolute -bottom-2 left-0 h-1.5 bg-brand-accent z-0 transform origin-left"
                />
            </motion.div>
        </div>
    );
}

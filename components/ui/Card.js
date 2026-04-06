"use client";

import { motion } from "framer-motion";
import { useScrollReady } from "@/hooks/useScrollReady";

export default function Card({
    children,
    className = "",
    hoverEffect = true,
    delay = 0,
}) {
    const ready = useScrollReady(500);

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={ready ? { opacity: 1, y: 0 } : undefined}
            viewport={ready ? { once: true, amount: 0.2 } : undefined}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={`group relative bg-brand-surface rounded-2xl border border-brand-border p-8 transition-all duration-300 overflow-hidden ${hoverEffect ? "hover:-translate-y-3 hover:shadow-2xl" : ""
                } ${className}`}
        >
            {/* Animated Top Border */}
            {hoverEffect && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-accent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10" />
            )}

            {/* Wrap children to allow icon specific targeting using CSS classes instead of changing child elements directly, but relies on caller adding the right classes */}
            <div className="relative z-0">
                {children}
            </div>
        </motion.div>
    );
}

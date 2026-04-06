"use client";

import { motion } from "framer-motion";

export default function InfiniteMarquee({ items = [], speed = 30, className = "" }) {
    return (
        <div className={`overflow-hidden relative w-full flex ${className}`}>
            {/* Soft gradient fades on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-bg to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-bg to-transparent z-10" />

            <motion.div
                className="flex whitespace-nowrap gap-12 md:gap-24 min-w-max px-6"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", repeat: Infinity, duration: speed }}
            >
                {/* Render items twice to create a seamless loop.
                    Since we translate to -50%, the second half exactly replaces the first half. */}
                {[...items, ...items].map((item, index) => (
                    <div key={index} className="flex-shrink-0 flex items-center justify-center">
                        {item}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

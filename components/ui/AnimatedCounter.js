"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

export default function AnimatedCounter({
    end,
    duration = 1,
    suffix = "",
    prefix = "",
    className = "",
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [count, setCount] = useState(0);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (!isInView) return;

        let startTime = null;
        let animationFrameId = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / (duration * 1000), 1);

            // Easing function: easeOutExpo
            const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

            setCount(Math.floor(end * easeOut));

            if (percentage < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setIsDone(true);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isInView, end, duration]);

    return (
        <motion.span
            ref={ref}
            className={className}
            animate={isDone ? { textShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 20px rgba(200,135,58,1)", "0px 0px 0px rgba(0,0,0,0)"] } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            {prefix}
            {count}
            {suffix}
        </motion.span>
    );
}

"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

export default function Button({
    children,
    href,
    variant = "primary",
    className = "",
    onClick,
    type = "button",
}) {
    const [ripples, setRipples] = useState([]);

    const baseClasses =
        "relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 will-change-transform overflow-hidden";

    const variants = {
        primary:
            "bg-brand-accent text-brand-dark px-8 py-3.5 hover:bg-brand-accent-hover hover:-translate-y-1 animate-pulse-glow",
        secondary:
            "bg-transparent border-2 border-brand-dark text-brand-dark px-8 py-3.5 hover:bg-brand-dark hover:text-white hover:-translate-y-1 hover:shadow-lg",
        outline:
            "bg-transparent border border-brand-border text-brand-text px-8 py-3.5 hover:border-brand-accent hover:text-brand-accent",
    };

    const addRipple = (e) => {
        const button = e.currentTarget.getBoundingClientRect();
        const size = Math.max(button.width, button.height);
        const x = e.clientX - button.left - size / 2;
        const y = e.clientY - button.top - size / 2;
        const newRipple = { x, y, size, key: Date.now() };

        setRipples((prev) => [...prev, newRipple]);

        if (onClick) onClick(e);
    };

    const removeRipple = (key) => {
        setRipples((prev) => prev.filter((r) => r.key !== key));
    };

    const classes = `${baseClasses} ${variants[variant]} ${className}`;

    const renderContent = () => (
        <>
            <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
            {ripples.map((ripple) => (
                <motion.span
                    key={ripple.key}
                    initial={{ scale: 0, opacity: 0.6 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    onAnimationComplete={() => removeRipple(ripple.key)}
                    className="absolute rounded-full bg-white/30 pointer-events-none z-0"
                    style={{
                        top: ripple.y,
                        left: ripple.x,
                        width: ripple.size,
                        height: ripple.size,
                    }}
                />
            ))}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={classes} onClick={(e) => addRipple(e)}>
                {renderContent()}
            </Link>
        );
    }

    return (
        <motion.button
            type={type}
            className={classes}
            onMouseDown={addRipple}
            whileTap={{ scale: 0.98 }}
        >
            {renderContent()}
        </motion.button>
    );
}

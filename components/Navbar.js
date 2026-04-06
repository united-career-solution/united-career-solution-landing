"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Candidates", path: "/candidate" },
        { name: "Employers", path: "/employer" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled
                ? "bg-brand-bg/90 backdrop-blur-md shadow-sm border-b border-brand-border/50 py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="font-heading font-bold text-brand-dark text-xl tracking-tight">
                        United Career <span className="text-brand-accent">Solutions</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`group relative text-sm font-bold transition-colors duration-150 hover:text-brand-accent ${pathname === link.path ? "text-brand-accent" : "text-brand-text"
                                }`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-brand-accent transition-all duration-200 ease-out origin-center ${pathname === link.path ? "w-full" : "w-0 group-hover:w-full"}`} />
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="px-6 py-2.5 rounded-full bg-brand-accent text-brand-dark font-medium text-sm transition-all hover:bg-brand-accent-hover hover:-translate-y-0.5 hover:shadow-warm-glow will-change-transform"
                    >
                        Get Started
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span
                        className={`block w-6 h-0.5 bg-brand-dark transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                            }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-brand-dark transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-brand-dark transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                            }`}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-brand-surface border-b border-brand-border shadow-warm-lg p-6 flex flex-col gap-4 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-lg font-medium transition-colors p-2 rounded-lg ${pathname === link.path
                                    ? "text-brand-accent bg-brand-bg"
                                    : "text-brand-text hover:bg-brand-bg hover:text-brand-accent"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="mt-4 px-6 py-3 rounded-full bg-brand-accent text-brand-dark font-medium text-center transition-all hover:bg-brand-accent-hover hover:shadow-warm-glow"
                        >
                            Get Started
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

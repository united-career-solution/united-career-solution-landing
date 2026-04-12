"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="bg-brand-dark pt-20 pb-10 border-t border-brand-border/10">
            <div className="max-w-[1400px] mx-auto px-6 md:px-8">
                <motion.div 
                    className="flex flex-wrap md:flex-nowrap gap-x-12 gap-y-16 justify-between mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15,
                                delayChildren: 0.1
                            }
                        }
                    }}
                >
                    <motion.div 
                        className="w-full md:w-1/3 min-w-[280px]"
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                    >
                        <Link href="/" className="inline-block mb-6">
                            <span className="font-heading font-bold text-white text-2xl tracking-tight">
                                United Career <span className="text-brand-accent">Solutions</span>
                            </span>
                        </Link>
                        <p className="text-white/50 mb-6 text-sm leading-relaxed max-w-sm">
                            Elevating hiring for ambitious candidates and growing companies across the US & UK. Premium talent, proven strategies.
                        </p>
                    </motion.div>

                    <motion.div 
                        className="w-full sm:w-[calc(50%-1.5rem)] md:w-auto min-w-[160px]"
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                    >
                        <h4 className="font-heading font-semibold text-white mb-6">For Candidates</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/candidate" className="text-white/60 hover:text-white transition-colors duration-200">Career Strategy</Link></li>
                            <li><Link href="/candidate" className="text-white/60 hover:text-white transition-colors duration-200">Resume Optimization</Link></li>
                            <li><Link href="/candidate" className="text-white/60 hover:text-white transition-colors duration-200">US & UK Placement</Link></li>
                            <li><Link href="/candidate" className="text-white/60 hover:text-white transition-colors duration-200">Interview Prep</Link></li>
                        </ul>
                    </motion.div>

                    <motion.div 
                        className="w-full sm:w-[calc(50%-1.5rem)] md:w-auto min-w-[160px]"
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                    >
                        <h4 className="font-heading font-semibold text-white mb-6">For Employers</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/employer" className="text-white/60 hover:text-white transition-colors duration-200">Hire Talent</Link></li>
                            <li><Link href="/employer" className="text-white/60 hover:text-white transition-colors duration-200">Pre-vetted Candidates</Link></li>
                            <li><Link href="/employer" className="text-white/60 hover:text-white transition-colors duration-200">Fast Turnaround</Link></li>
                            <li><Link href="/employer" className="text-white/60 hover:text-white transition-colors duration-200">Our Process</Link></li>
                        </ul>
                    </motion.div>

                    <motion.div 
                        className="w-full sm:w-[calc(50%-1.5rem)] md:w-auto min-w-[160px]"
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                    >
                        <h4 className="font-heading font-semibold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/about" className="text-white/60 hover:text-white transition-colors duration-200">About Us</Link></li>
                            <li><Link href="/contact" className="text-white/60 hover:text-white transition-colors duration-200">Contact</Link></li>
                            <li><Link href="#" className="text-white/60 hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-white/60 hover:text-white transition-colors duration-200">Terms of Service</Link></li>
                        </ul>
                    </motion.div>
                </motion.div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-white/40">
                        &copy; {new Date().getFullYear()} United Career Solutions. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AnimatedHeadline from "@/components/ui/AnimatedHeadline";
import TypewriterText from "@/components/ui/TypewriterText";
import { useScrollReady } from "@/hooks/useScrollReady";

export default function AboutPage() {
    const ready = useScrollReady(500);
    return (
        <>
            {/* HERO */}
            <section className="relative pt-40 pb-32 px-6 overflow-hidden bg-brand-bg min-h-[60vh] flex items-center justify-center rounded-b-[20px] md:rounded-b-[40px] z-20 shadow-xl">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], x: [0, 80, 0], y: [0, -80, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 -left-1/4 w-[600px] h-[600px] bg-brand-accent/15 rounded-full blur-[140px]"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], x: [0, -60, 0], y: [0, 80, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-brand-secondary/15 rounded-full blur-[120px]"
                    />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
                    <AnimatedHeadline
                        text="We Are United Career Solutions"
                        delay={0.2}
                        className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-brand-dark justify-center mb-6"
                    />

                    <div className="min-h-[60px]">
                        <TypewriterText
                            text="Bridging the gap between outstanding global talent and forward-thinking companies in the US and UK."
                            delay={0.8}
                            className="text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed"
                        />
                    </div>
                </div>
            </section>

            {/* STORY & MISSION */}
            <section className="-mt-20 pt-44 pb-24 px-6 relative overflow-hidden z-10 text-white">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-[#212745] to-brand-secondary z-0" />
                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0" />

                <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={ready ? { opacity: 1, y: 0 } : undefined}
                        viewport={ready ? { once: true, amount: 0.2 } : undefined}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="bg-white/[0.06] backdrop-blur-[12px] rounded-2xl p-6 md:p-8 shadow-lg border border-white/10 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 h-full flex flex-col max-w-lg mx-auto w-full"
                    >
                        <h2 className="text-xl md:text-2xl mb-4 text-white font-bold tracking-tight">Our Story</h2>
                        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base flex-grow">
                            <p>
                                We started with a simple observation: the hiring market is fundamentally broken for both sides. Talented candidates send hundreds of resumes into the void, while companies drown in unqualified applications.
                            </p>
                            <p>
                                United Career Solutions was founded to introduce strategy, precision, and human connection back into the equation. We act as a specialized bridge, focusing heavily on the nuances of the US and UK markets.
                            </p>
                            <p>
                                Today, we are proud to have placed hundreds of candidates and partnered with leading tech firms, startups, and enterprises to build their dream teams.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={ready ? { opacity: 1, y: 0 } : undefined}
                        viewport={ready ? { once: true, amount: 0.2 } : undefined}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="bg-white/[0.06] backdrop-blur-[12px] rounded-2xl p-6 md:p-8 shadow-lg border border-white/10 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 h-full flex flex-col max-w-lg mx-auto w-full"
                    >
                        <h2 className="text-xl md:text-2xl mb-4 text-white font-bold tracking-tight">Our Mission</h2>
                        <div className="flex-grow flex flex-col">
                            <p className="text-base md:text-lg font-medium text-white leading-relaxed italic mb-6 border-l-4 border-brand-accent pl-4 py-2 bg-white/5 rounded-r-lg">
                                "To democratize access to top global opportunities by completely removing friction from the hiring process."
                            </p>
                            <div className="space-y-3 mt-2">
                                <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Core Values</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-3 text-slate-300 bg-white/5 p-2 rounded-md"><span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(234,179,8,0.5)]"></span> <span className="font-medium text-sm md:text-base">Total Transparency</span></li>
                                    <li className="flex items-center gap-3 text-slate-300 bg-white/5 p-2 rounded-md"><span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(234,179,8,0.5)]"></span> <span className="font-medium text-sm md:text-base">Precision & Speed</span></li>
                                    <li className="flex items-center gap-3 text-slate-300 bg-white/5 p-2 rounded-md"><span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(234,179,8,0.5)]"></span> <span className="font-medium text-sm md:text-base">Human-Centric Focus</span></li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* TEAM (Placeholder) */}
            <section className="py-24 px-6 bg-brand-bg">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl mb-4">Meet the Experts</h2>
                    <p className="text-xl text-brand-muted mb-16">The strategists behind your next big career move or hire.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { name: "Alex Mercer", role: "CEO & Founder" },
                            { name: "Samantha Lee", role: "Head of US Placements" },
                            { name: "David Chen", role: "Head of UK Placements" },
                            { name: "Emily Watson", role: "Director of Employer Partnerships" },
                        ].map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={ready ? { opacity: 1, y: 0 } : undefined}
                                viewport={ready ? { once: true, amount: 0.2 } : undefined}
                                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-[4/5] bg-brand-border/30 rounded-2xl mb-6 overflow-hidden relative">
                                    {/* Placeholder Avatar */}
                                    <div className="absolute inset-0 bg-brand-dark/5 group-hover:bg-brand-accent/20 transition-colors flex items-center justify-center text-brand-muted/20">
                                        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold font-heading text-brand-dark">{member.name}</h3>
                                <p className="text-brand-muted">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 text-white text-center relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-[#212745] to-brand-secondary z-0" />
                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0" />

                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] z-0"></div>
                <div className="max-w-3xl mx-auto relative z-10">
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 text-white drop-shadow-sm">Let's Work Together</h2>
                    <Button href="/contact" className="px-10 py-4 shadow-lg shadow-brand-accent/20 hover:-translate-y-1 transition-transform">Contact Our Team</Button>
                </div>
            </section>
        </>
    );
}

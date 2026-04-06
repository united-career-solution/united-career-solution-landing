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
            <section className="relative pt-40 pb-24 px-6 overflow-hidden bg-brand-bg min-h-[60vh] flex items-center justify-center">
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
            <section className="py-24 px-6 bg-white border-y border-brand-border">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={ready ? { opacity: 1, x: 0 } : undefined}
                        viewport={ready ? { once: true, amount: 0.2 } : undefined}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl md:text-4xl mb-6 text-brand-dark">Our Story</h2>
                        <div className="space-y-4 text-brand-dark/80 leading-relaxed text-lg">
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
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={ready ? { opacity: 1, x: 0 } : undefined}
                        viewport={ready ? { once: true, amount: 0.2 } : undefined}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl md:text-4xl mb-6 text-brand-dark">Our Mission</h2>
                        <Card hoverEffect={false} className="bg-brand-bg shadow-inner border-0 h-full">
                            <p className="text-xl font-medium text-brand-dark leading-relaxed italic mb-8">
                                "To democratize access to top global opportunities by completely removing friction from the hiring process."
                            </p>
                            <div className="space-y-4">
                                <h4 className="font-bold text-brand-dark">Core Values:</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-brand-dark/80"><span className="w-2 h-2 rounded-full bg-brand-accent"></span> Total Transparency</li>
                                    <li className="flex items-center gap-3 text-brand-dark/80"><span className="w-2 h-2 rounded-full bg-brand-accent"></span> Precision & Speed</li>
                                    <li className="flex items-center gap-3 text-brand-dark/80"><span className="w-2 h-2 rounded-full bg-brand-accent"></span> Human-Centric Focus</li>
                                </ul>
                            </div>
                        </Card>
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
            <section className="py-24 px-6 bg-brand-dark text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl mb-8">Let's Work Together</h2>
                    <Button href="/contact">Contact Our Team</Button>
                </div>
            </section>
        </>
    );
}

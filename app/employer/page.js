"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedHeadline from "@/components/ui/AnimatedHeadline";
import TypewriterText from "@/components/ui/TypewriterText";
import FloatingBadge from "@/components/ui/FloatingBadge";
import { useScrollReady } from "@/hooks/useScrollReady";

// Safe Icons
const DocumentRemoveIcon = () => (
    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm-6-2.25l-3 3m0 0l-3-3m3 3V12" />
    </svg>
);

const ClockIcon = () => (
    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const UserCheckIcon = () => (
    <svg className="w-8 h-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632zM21 12l-3 3-5-5-2-2 3-3 7 7z" />
    </svg>
);

const BoltIcon = () => (
    <svg className="w-8 h-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
);

export default function EmployerPage() {
    const timelineRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start center", "end center"] });
    const ready = useScrollReady(500);

    const processSteps = [
        { title: "Requirement Discussion", desc: "We map out exactly what you're looking for, beyond just the JD." },
        { title: "Sourcing", desc: "Tapping into our private network of top-tier talent in US & UK." },
        { title: "Screening", desc: "Rigorous technical and behavioral rounds by our team." },
        { title: "Shortlisting", desc: "You receive only the top 3-5 candidates. No clutter." },
        { title: "Interview", desc: "Seamless scheduling and final stage management." },
    ];

    return (
        <>
            {/* HERO */}
            <section className="relative pt-40 pb-24 px-6 overflow-hidden bg-brand-dark text-white min-h-[70vh] flex items-center justify-center">
                {/* Background Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                >
                    <source src="/Videos/6036938_Office_People_3840x2160.mp4" type="video/mp4" />
                </video>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50 z-[1]" />

                {/* Floating Badges (Dark Mode specific border styling explicitly overriding default) */}
                <FloatingBadge className="!bg-brand-surface/10 !text-white/90 !border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]" text="Vetted Full-Stack" top="8%" left="3%" delay={1.5} floatDuration={6} />
                <FloatingBadge className="!bg-brand-surface/10 !text-white/90 !border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]" text="Immediate Starts" top="8%" right="3%" delay={1.8} floatDuration={5} />
                <FloatingBadge className="!bg-brand-surface/10 !text-white/90 !border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]" text="Global Talent" bottom="8%" left="4%" delay={2.1} floatDuration={7} />

                <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
                    <AnimatedHeadline
                        text="Stop Wasting Time on Unqualified Candidates."
                        delay={0.2}
                        className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white focus:outline-none justify-center mb-6"
                    />

                    <div className="min-h-[60px] mb-12">
                        <TypewriterText
                            text="Hire pre-screened talent for US & UK roles in 48-72 hours."
                            delay={0.8}
                            className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed"
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, duration: 0.6, type: "spring", damping: 10, stiffness: 150 }}
                        className="pt-4 flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button href="/contact">Hire Now</Button>
                        <Button href="/contact" variant="secondary" className="border-white/30 text-white hover:bg-white/10">Submit Requirement</Button>
                    </motion.div>
                </div>
            </section>

            {/* PROBLEMS SECTION */}
            <section className="py-24 px-6 bg-brand-bg border-b border-brand-border">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <SectionHeading center={true}>The Broken Hiring Paradigm</SectionHeading>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card hoverEffect={true} delay={0.1} className="bg-white">
                            <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-6 border border-red-100">
                                <DocumentRemoveIcon />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Too many irrelevant resumes</h3>
                            <p className="text-brand-muted">Job posts attract 1000s of applicants. Your team wastes hours shifting through candidates who don't meet basic requirements.</p>
                        </Card>
                        <Card hoverEffect={true} delay={0.2} className="bg-white">
                            <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-6 border border-red-100">
                                <ClockIcon />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Slow hiring process</h3>
                            <p className="text-brand-muted">By the time you identify a strong candidate, they've already accepted another offer. Speed is critical.</p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* SOLUTION SECTION */}
            <section className="py-24 px-6 bg-white shrink">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <SectionHeading center={true}>The Solution</SectionHeading>
                        <p className="text-xl text-brand-muted mt-4">We do the heavy lifting so you can focus on building your product.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card delay={0.1}>
                            <div className="text-brand-accent mb-6"><UserCheckIcon /></div>
                            <h3 className="text-xl font-bold mb-2">Pre-vetted Candidates</h3>
                            <p className="text-brand-muted">Every profile we submit has passed our technical and behavioral evaluations.</p>
                        </Card>
                        <Card delay={0.2}>
                            <div className="text-brand-accent mb-6"><BoltIcon /></div>
                            <h3 className="text-xl font-bold mb-2">Fast Turnaround</h3>
                            <p className="text-brand-muted">Expect 3-5 solid profiles delivered to your inbox within 48–72 hours.</p>
                        </Card>
                        <Card delay={0.3}>
                            <div className="text-brand-accent mb-6">
                                <svg className="w-8 h-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Dedicated Recruiter</h3>
                            <p className="text-brand-muted">A single point of contact who understands your company culture and tech stack.</p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* WHY US */}
            <section className="py-24 px-6 bg-brand-bg border-y border-brand-border">
                <div className="max-w-6xl mx-auto text-center">
                    <SectionHeading center={true} className="mb-16">Why Partner With Us?</SectionHeading>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8">
                            <h4 className="text-2xl font-bold text-brand-dark mb-4">Quality over Quantity</h4>
                            <p className="text-brand-muted">We don't spam inboxes. We present high-signal matches only.</p>
                        </div>
                        <div className="p-8 border-y md:border-y-0 md:border-x border-brand-border">
                            <h4 className="text-2xl font-bold text-brand-dark mb-4">US & UK Expertise</h4>
                            <p className="text-brand-muted">Deep understanding of visa implications, remote hiring, and regional compensation benchmarks.</p>
                        </div>
                        <div className="p-8">
                            <h4 className="text-2xl font-bold text-brand-dark mb-4">Long-term Focus</h4>
                            <p className="text-brand-muted">We're built to scale alongside your organization, managing your entire pipeline.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS TIMELINE */}
            <section className="py-24 px-6 bg-white overflow-hidden relative">
                <div className="max-w-4xl mx-auto">
                    <SectionHeading center={true} className="mb-20">How We Work Together</SectionHeading>

                    <div className="relative" ref={timelineRef}>
                        <div className="absolute left-1/2 md:left-[28px] top-0 bottom-0 w-1 bg-brand-border" />
                        <motion.div
                            className="absolute left-1/2 md:left-[28px] top-0 bottom-0 w-1 bg-brand-accent origin-top z-0"
                            style={{ scaleY: scrollYProgress }}
                        />

                        <div className="space-y-12">
                            {processSteps.map((step, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={ready ? { opacity: 1, y: 0 } : undefined}
                                    viewport={ready ? { once: true, amount: 0.2 } : undefined}
                                    transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                                    key={i}
                                    className="relative flex flex-col md:flex-row items-center md:items-start group"
                                >
                                    <div className="w-14 h-14 rounded-full bg-brand-secondary text-white font-bold text-xl flex items-center justify-center relative z-10 shrink-0 mx-auto md:mx-0 shadow-warm-glow ring-4 ring-white mb-4 md:mb-0">
                                        {i + 1}
                                    </div>
                                    <div className="md:ml-8 text-center md:text-left bg-brand-bg border border-brand-border p-6 md:p-8 rounded-2xl flex-grow shadow-sm group-hover:shadow-warm-lg transition-transform hover:-translate-y-2">
                                        <h3 className="text-2xl font-bold mb-2 text-brand-dark">{step.title}</h3>
                                        <p className="text-brand-muted text-lg">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 relative overflow-hidden bg-brand-accent text-brand-dark text-center">
                <div className="max-w-3xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={ready ? { opacity: 1, y: 0 } : undefined}
                        viewport={ready ? { once: true, amount: 0.2 } : undefined}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Build Your Dream Team.</h2>
                        <p className="text-xl font-medium opacity-80 mb-10 max-w-2xl mx-auto">
                            Partner with us to find your next great hire.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button href="/contact" className="bg-brand-dark text-white hover:bg-brand-dark/90 px-10">
                                Hire Now
                            </Button>
                            <Button href="/contact" variant="secondary" className="border-brand-dark/30 hover:bg-brand-dark/10 px-10">
                                Submit Requirement
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}

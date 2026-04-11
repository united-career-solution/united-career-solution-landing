"use client";

import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedHeadline from "@/components/ui/AnimatedHeadline";
import TypewriterText from "@/components/ui/TypewriterText";
import FloatingBadge from "@/components/ui/FloatingBadge";
import HeroVideo from "@/components/ui/HeroVideo";
import { useScrollReady } from "@/hooks/useScrollReady";

// Safe SVG Icons
const SearchIcon = () => (
    <svg className="w-8 h-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

const DocumentIcon = () => (
    <svg className="w-8 h-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

const UserGroupIcon = () => (
    <svg className="w-8 h-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
);

const ChatBubbleIcon = () => (
    <svg className="w-8 h-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
);

export default function CandidatePage() {
    const [country, setCountry] = useState("US");
    const timelineRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start center", "end center"] });
    const ready = useScrollReady(500);

    const processSteps = [
        { title: "Profile Analysis", desc: "We deep-dive into your resume, gaps, and unique strengths." },
        { title: "Strategy Planning", desc: "Setting the precise targeting framework for roles you seek." },
        { title: "Applications", desc: "We execute targeted applications using proven methods." },
        { title: "Interview Support", desc: "1-on-1 prep to make sure you crush the technical and behavioral rounds." },
        { title: "Offer Guidance", desc: "Negotiation strategies to get you exactly what you're worth." },
    ];

    return (
        <>
            {/* HERO */}
            <section className="relative pt-40 pb-24 px-6 overflow-hidden bg-brand-dark min-h-[70vh] flex items-center justify-center">
                {/* Background Video (lazy-loaded) */}
                <HeroVideo src="/Videos/6036412_Team_Business_3840x2160.mp4" />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50 z-[1]" />

                {/* Floating Badges */}
                <FloatingBadge className="!bg-white/10 !text-white/90 !border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]" text="Senior SWE Offers" top="8%" left="3%" delay={1.5} floatDuration={6} />
                <FloatingBadge className="!bg-white/10 !text-white/90 !border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]" text="$150k+ Placements" top="8%" right="3%" delay={1.8} floatDuration={5} />
                <FloatingBadge className="!bg-white/10 !text-white/90 !border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]" text="Bypass the ATS" bottom="8%" left="4%" delay={2.1} floatDuration={7} />

                <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
                    <AnimatedHeadline
                        text="Your Job Search is Broken. We Fix It."
                        delay={0.2}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white justify-center mb-6"
                    />

                    <div className="min-h-[60px] mb-12">
                        <TypewriterText
                            text="Land interviews and offers with a proven system."
                            delay={0.8}
                            className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed"
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, duration: 0.6, type: "spring", damping: 10, stiffness: 150 }}
                        className="flex justify-center"
                    >
                        <Button href="/contact">Get Started</Button>
                    </motion.div>
                </div>
            </section>

            {/* PAIN POINTS */}
            <section className="py-24 px-6 bg-white border-y border-brand-border">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <SectionHeading center={true}>Sound Familiar?</SectionHeading>
                        <p className="text-lg text-brand-muted mt-4 max-w-2xl mx-auto">
                            These are the real frustrations candidates face when trying to land roles abroad.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
                        {[
                            {
                                label: "Pain Point #1",
                                title: "Random Job Applications",
                                desc: "Applying to hundreds of jobs without knowing if your profile actually matches what employers are looking for.",
                                icon: (
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                ),
                            },
                            {
                                label: "Pain Point #2",
                                title: "Lack of Career Guidance",
                                desc: "No proper guidance on which roles or industries best fit your skills, experience, and visa eligibility.",
                                icon: (
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                    </svg>
                                ),
                            },
                            {
                                label: "Pain Point #3",
                                title: "Unclear Hiring Processes",
                                desc: "Confusing recruitment pipelines and unrealistic promises from agencies leave you stuck in limbo.",
                                icon: (
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                ),
                            },
                            {
                                label: "Pain Point #4",
                                title: "Interview Preparation Gaps",
                                desc: "Struggling to prepare for international interview standards and employer expectations without proper support.",
                                icon: (
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                    </svg>
                                ),
                            },
                        ].map((point, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={ready ? { opacity: 1, y: 0 } : undefined}
                                viewport={ready ? { once: true, amount: 0.2 } : undefined}
                                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                                className="group relative bg-red-50/40 rounded-2xl border border-red-100 p-5 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
                            >
                                {/* Hover top accent */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-red-400 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

                                <div className="flex items-start gap-3 md:gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-500">
                                        {point.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-red-500 font-bold text-xs md:text-sm tracking-wide uppercase">{point.label}</span>
                                        <h3 className="text-base md:text-xl lg:text-2xl font-bold mb-1 md:mb-3 text-brand-dark leading-snug">{point.title}</h3>
                                        <p className="text-brand-muted text-xs md:text-base leading-relaxed">{point.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* SERVICES */}
            <section className="py-24 px-6 bg-brand-bg relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px] -z-0" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-secondary/5 rounded-full blur-[80px] -z-0" />

                <div className="max-w-6xl mx-auto z-10 relative">
                    <div className="text-center mb-20">
                        <SectionHeading center={true}>Our Services for Candidates</SectionHeading>
                        <p className="text-xl text-brand-muted mt-4 max-w-2xl mx-auto">
                            Comprehensive support designed to accelerate your career and get you hired with confidence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Employment Opportunities Aligning with Your Visa Status",
                                desc: "We match you with job opportunities that align with your visa conditions and legal work eligibility. Our team ensures you connect with employers who understand visa requirements and sponsorship possibilities.",
                                image: "/images/services/visa-employment.png",
                                icon: SearchIcon,
                            },
                            {
                                title: "Career Guidance",
                                desc: "Receive expert guidance to help you plan your career path in international markets. Our advisors assist with role selection, industry expectations, and long-term career strategy.",
                                image: "/images/services/career-guidance.png",
                                icon: UserGroupIcon,
                            },
                            {
                                title: "Training Programs",
                                desc: "Access training programs designed to enhance your professional skills and increase employability. These programs focus on industry-relevant knowledge and practical skill development.",
                                image: "/images/services/training-programs.png",
                                icon: DocumentIcon,
                            },
                            {
                                title: "Interview Support",
                                desc: "Get complete interview preparation including mock interviews, communication guidance, and employer expectation insights to help you confidently perform in real interviews.",
                                image: "/images/services/interview-support.png",
                                icon: ChatBubbleIcon,
                            },
                            {
                                title: "Expert Recruiter Counselling",
                                desc: "Our experienced recruiters provide personalized counselling to understand your profile, career goals, and strengths so they can match you with the right opportunities.",
                                image: "/images/services/recruiter-counselling.png",
                                icon: UserGroupIcon,
                            },
                            {
                                title: "End-to-End Support From Resume to Offer Letter",
                                desc: "We guide candidates throughout the entire hiring journey — from resume improvement and job applications to interview coordination and securing the final offer letter.",
                                image: "/images/services/end-to-end-support.png",
                                icon: DocumentIcon,
                            },
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={ready ? { opacity: 1, y: 0 } : undefined}
                                viewport={ready ? { once: true, amount: 0.15 } : undefined}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                                className="group relative bg-brand-surface rounded-2xl border border-brand-border overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
                            >
                                {/* Animated Top Border */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-accent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10" />

                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-brand-dark/10 to-transparent" />
                                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-brand-accent/90 backdrop-blur-sm flex items-center justify-center shadow-lg text-white [&_svg]:text-white">
                                        <service.icon />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-lg font-bold mb-3 text-brand-dark leading-snug">{service.title}</h3>
                                    <p className="text-brand-muted text-sm leading-relaxed">{service.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS TIMELINE */}
            <section className="py-24 px-6 bg-white overflow-hidden relative">
                <div className="max-w-4xl mx-auto">
                    <SectionHeading center={true} className="mb-20">Our Process</SectionHeading>

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
                                    <div className="w-14 h-14 rounded-full bg-brand-accent text-brand-dark font-bold text-xl flex items-center justify-center relative z-10 shrink-0 mx-auto md:mx-0 shadow-warm-glow ring-4 ring-white mb-4 md:mb-0">
                                        {i + 1}
                                    </div>
                                    <div className="md:ml-8 text-center md:text-left bg-brand-surface border border-brand-border p-6 md:p-8 rounded-2xl flex-grow shadow-sm group-hover:shadow-warm-lg transition-transform hover:-translate-y-2">
                                        <h3 className="text-2xl font-bold mb-2 text-brand-dark">{step.title}</h3>
                                        <p className="text-brand-muted text-lg">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* COUNTRY TOGGLE (Critical Feature) */}
            <section className="py-24 px-6 text-white relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-[#212745] to-brand-secondary z-0" />
                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <SectionHeading center={true} light={true} className="mb-8 ">Tailored for Your Target Market</SectionHeading>

                    <div className="inline-flex bg-white/10 rounded-full p-1.5 mb-12 relative overflow-hidden backdrop-blur-md">
                        <button
                            onClick={() => setCountry("US")}
                            className={`relative z-10 px-8 py-3 rounded-full font-medium transition-colors ${country === "US" ? "text-brand-dark" : "text-white hover:text-white/80"}`}
                        >
                            US Jobs
                        </button>
                        <button
                            onClick={() => setCountry("UK")}
                            className={`relative z-10 px-8 py-3 rounded-full font-medium transition-colors ${country === "UK" ? "text-brand-dark" : "text-white hover:text-white/80"}`}
                        >
                            UK Jobs
                        </button>
                        <motion.div
                            className="absolute top-1/2 -translate-y-1/2 h-[calc(100%-12px)] w-[calc(50%-6px)] bg-brand-accent rounded-full z-0 pointer-events-none"
                            animate={{ left: country === "US" ? "6px" : "calc(50% + 6px)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                    </div>

                    <div className="min-h-[250px]">
                        <AnimatePresence mode="wait">
                            {country === "US" ? (
                                <motion.div
                                    key="us"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white/5 border border-white/10 p-10 rounded-3xl text-left"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-4xl text-white">🇺🇸</span>
                                        <h3 className="text-3xl font-bold text-white">US Market Strategy</h3>
                                    </div>
                                    <ul className="space-y-4 text-white/90 text-lg font-medium">
                                        <li className="flex items-center gap-3"><span className="text-brand-accent">✓</span> OPT / H1B strategy alignment</li>
                                        <li className="flex items-center gap-3"><span className="text-brand-accent">✓</span> Navigating US employer expectations</li>
                                        <li className="flex items-center gap-3"><span className="text-brand-accent">✓</span> US tech hub specific networking (SV, NYC, Austin)</li>
                                    </ul>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="uk"
                                    initial={{ opacity: 0, y: 60 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-white/5 border border-white/10 p-10 rounded-3xl text-left backdrop-blur-sm"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-4xl text-white">🇬🇧</span>
                                        <h3 className="text-3xl font-bold text-white">UK Market Strategy</h3>
                                    </div>
                                    <ul className="space-y-4 text-white/90 text-lg font-medium">
                                        <li className="flex items-center gap-3"><span className="text-brand-accent">✓</span> Visa & Right-to-Work awareness</li>
                                        <li className="flex items-center gap-3"><span className="text-brand-accent">✓</span> UK CV format localization</li>
                                        <li className="flex items-center gap-3"><span className="text-brand-accent">✓</span> Inside/Outside IR35 contract understanding</li>
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* TRANSPARENCY & CTA */}
            <section className="py-24 px-6 bg-brand-bg text-center">
                <div className="max-w-3xl mx-auto">
                    <Card hoverEffect={false} className="bg-brand-surface/50 border-dashed border-brand-muted/30 mb-12">
                        <p className="text-brand-muted font-medium italic">
                            "We do not guarantee jobs, but we maximize your chances. Success requires your hard work combined with our proven systems."
                        </p>
                    </Card>

                    <SectionHeading center={true} className="mb-10">Ready to Upgrade Your Search?</SectionHeading>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button href="/contact" variant="primary">Get Started</Button>
                        <Button href="/contact" variant="secondary">Talk to Expert</Button>
                    </div>
                </div>
            </section>
        </>
    );
}

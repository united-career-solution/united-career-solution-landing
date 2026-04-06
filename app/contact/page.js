"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AnimatedHeadline from "@/components/ui/AnimatedHeadline";
import TypewriterText from "@/components/ui/TypewriterText";

export default function ContactPage() {
    const [role, setRole] = useState("Candidate");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const form = e.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            data.role = role; // Include whether they are candidate or employer

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
            await fetch(`${apiUrl}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
            setSubmitted(true);
        }
    };

    return (
        <div className="min-h-screen bg-brand-bg relative">
            <div className="absolute top-0 left-0 w-full h-[450px] bg-brand-dark rounded-b-[40px] z-0" />

            <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16 px-4">
                    <AnimatedHeadline
                        text="Get in Touch"
                        delay={0.2}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 justify-center"
                    />

                    <div className="min-h-[60px]">
                        <TypewriterText
                            text="Whether you're looking to elevate your career or expand your team, we're here to help."
                            delay={0.8}
                            className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                        className="lg:col-span-3"
                    >
                        <Card hoverEffect={false} className="h-full p-8 md:p-12 shadow-2xl relative overflow-hidden bg-white">
                            <h2 className="text-3xl font-bold mb-8 text-brand-dark">Send us a message</h2>

                            {/* Role Toggle */}
                            <div className="flex bg-brand-bg p-1.5 rounded-xl mb-8 relative">
                                <button
                                    type="button"
                                    className={`flex-1 py-3 text-center rounded-lg font-medium transition-all relative z-10 ${role === "Candidate" ? "text-white" : "text-brand-muted hover:text-brand-dark"}`}
                                    onClick={() => setRole("Candidate")}
                                >
                                    I'm a Candidate
                                </button>
                                <button
                                    type="button"
                                    className={`flex-1 py-3 text-center rounded-lg font-medium transition-all relative z-10 ${role === "Employer" ? "text-white" : "text-brand-muted hover:text-brand-dark"}`}
                                    onClick={() => setRole("Employer")}
                                >
                                    I'm an Employer
                                </button>
                                <motion.div
                                    className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-brand-dark rounded-lg z-0"
                                    animate={{ left: role === "Candidate" ? "6px" : "calc(50% + 0px)" }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            </div>

                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="py-16 text-center"
                                    >
                                        <div className="w-20 h-20 bg-brand-accent/20 text-brand-accent rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-brand-dark mb-2">Message Sent!</h3>
                                        <p className="text-brand-muted">We'll get back to you within 24 hours.</p>
                                        <button onClick={() => setSubmitted(false)} className="mt-8 text-brand-accent font-medium hover:underline">
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-brand-dark">First Name</label>
                                                <input required name="firstName" type="text" className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/50 focus:outline-none transition-all placeholder:text-brand-dark/60 placeholder:opacity-100" placeholder="John" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-brand-dark">Last Name</label>
                                                <input required name="lastName" type="text" className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/50 focus:outline-none transition-all placeholder:text-brand-dark/60 placeholder:opacity-100" placeholder="Doe" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-brand-dark">Email Address</label>
                                            <input required name="email" type="email" className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/50 focus:outline-none transition-all placeholder:text-brand-dark/60 placeholder:opacity-100" placeholder="john@example.com" />
                                        </div>

                                        {role === "Employer" && (
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-brand-dark">Company Name</label>
                                                <input required name="company" type="text" className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/50 focus:outline-none transition-all placeholder:text-brand-dark/60 placeholder:opacity-100" placeholder="Acme Corp" />
                                            </div>
                                        )}

                                        {role === "Candidate" && (
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-brand-dark">LinkedIn Profile URL</label>
                                                <input required name="linkedin" type="url" className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/50 focus:outline-none transition-all placeholder:text-brand-dark/60 placeholder:opacity-100" placeholder="https://linkedin.com/in/..." />
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-brand-dark">Message</label>
                                            <textarea required name="message" rows={4} className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/50 focus:outline-none transition-all placeholder:text-brand-dark/60 placeholder:opacity-100 resize-none" placeholder={`Tell us about your ${role === "Candidate" ? "career goals" : "hiring needs"}...`} />
                                        </div>

                                        <Button type="submit" variant="primary" className="w-full relative">
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending...
                                                </span>
                                            ) : "Send Message"}
                                        </Button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </Card>
                    </motion.div>

                    {/* Info Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="space-y-3">
                            <h3 className="text-brand-dark font-heading font-bold text-2xl">Contact Information</h3>
                            <p className="text-brand-muted">Reach out directly through email or visit our offices.</p>
                        </div>

                        <div className="bg-brand-surface rounded-2xl p-6 border border-brand-border hover:shadow-warm-lg transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark">Email Us</h4>
                                    <p className="text-brand-muted mb-2">Our friendly team is here to help.</p>
                                    <a href="mailto:hello@unitedcareersolution.com" className="text-brand-accent font-medium hover:underline break-all">hello@unitedcareersolution.com</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-brand-surface rounded-2xl p-6 border border-brand-border hover:shadow-warm-lg transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark">Global Support</h4>
                                    <p className="text-brand-muted">
                                        Operating seamlessly across<br />
                                        US & UK time zones.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-brand-surface rounded-2xl p-6 border border-brand-border hover:shadow-warm-lg transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark">Fast Turnaround</h4>
                                    <p className="text-brand-muted">
                                        Expect a detailed response<br />
                                        within 24 hours.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedHeadline from "@/components/ui/AnimatedHeadline";
import TypewriterText from "@/components/ui/TypewriterText";
import FloatingBadge from "@/components/ui/FloatingBadge";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import { useScrollReady } from "@/hooks/useScrollReady";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Safe SVG Icons
const CheckCircle = () => (
  <svg className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckCircleLight = () => (
  <svg className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-8 h-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-8 h-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5 text-brand-accent" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const textRevealTitle = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.50, ease: "easeOut" },
  },
};

const textRevealDesc = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
  },
};

// "Why We Are Different" feature data with images
const whyDifferentFeatures = [
  {
    title: "No random job applications",
    desc: "Every application is targeted, personalized, and strategic.",
    image: "/images/why-different/targeted-search.png",
  },
  {
    title: "No fake promises",
    desc: "Transparent tracking and realistic expectations, always.",
    image: "/images/why-different/transparency-metrics.png",
  },
  {
    title: "Strategic job targeting",
    desc: "We match skills exactly to what hiring managers seek.",
    image: "/images/why-different/strategic-targeting.png",
  },
  {
    title: "Real recruiter connections",
    desc: "Bypassing the ATS black hole via direct outreach.",
    image: "/images/why-different/recruiter-connections.png",
  },
  {
    title: "Dedicated support",
    desc: "1-on-1 guidance from strategy to salary negotiation.",
    image: "/images/why-different/dedicated-support.png",
  },
];

// Services data
const candidateServices = [
  "Visa-Aligned Employment Opportunities",
  "Personalized Career Guidance",
  "Professional Training Programs",
  "Interview Preparation & Support",
  "Expert Recruiter Counselling",
  "End-to-End Resume to Offer Support",
];

const employerServices = [
  "Access to Pre-Screened Candidates",
  "Visa-Ready Talent Pool",
  "Efficient Recruitment Process",
  "Dedicated Recruitment Support",
  "Industry-Specific Talent Matching",
  "End-to-End Hiring Assistance",
];

const testimonials = [
  { name: "Rahul S.", role: "Software Engineer, Placed in US", text: "I struggled for months getting AI rejections. UCS completely rebuilt my strategy and within 4 weeks, I had 3 offers." },
  { name: "Ankit V.", role: "Hiring Manager, FinTech", text: "We were drowning in unqualified resumes. UCS brought us 4 pre-vetted senior devs in 72 hours. Outstanding service." },
  { name: "Priya M.", role: "Data Scientist, Placed in UK", text: "They don't just apply for jobs—they actively network for you. My portfolio was positioned perfectly for the UK market." },
  { name: "Rohit K.", role: "VP of Engineering", text: "Speed and quality. That's what you get. Every candidate we interviewed from them was a solid fit." },
  { name: "Sneha I.", role: "Product Manager, Placed in US", text: "The interview prep was game-changing. I walked into my FAANG interviews feeling completely prepared and confident." },
  { name: "Neha G.", role: "Startup Founder", text: "As a small team, we don't have an internal recruiter. UCS acts as our strategic partner for rapid scaling." },
];

export default function Home() {
  const ready = useScrollReady(500);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 bg-brand-bg">
          <motion.div
            animate={{ scale: [1, 1.1, 1], x: [0, 80, 0], y: [0, -80, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-brand-accent/15 rounded-full blur-[140px]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], x: [0, -60, 0], y: [0, 80, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-brand-secondary/15 rounded-full blur-[120px]"
          />
          {/* Drifting Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              animate={{
                y: [0, -40 * (i + 1), 0],
                x: [0, 25 * (i % 2 === 0 ? 1 : -1), 0],
                opacity: [0.3, 0.8, 0.3],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: "linear" }}
              className="absolute w-2 h-2 rounded-sm bg-brand-accent opacity-40 blur-[1px]"
              style={{
                top: `${15 + i * 10}%`,
                left: `${10 + i * 12}%`
              }}
            />
          ))}
        </div>

        {/* Floating Badges */}
        <FloatingBadge text="Top 1% Talent" top="8%" left="3%" delay={1.5} floatDuration={6} />
        <FloatingBadge text="Fast 48h Hiring" top="8%" right="3%" delay={1.8} floatDuration={5} />
        <FloatingBadge text="Pre-Vetted" bottom="8%" left="4%" delay={2.1} floatDuration={7} />

        <div className="max-w-4xl mx-auto px-6 text-center z-10 pt-20">
          <AnimatedHeadline
            text="Stop Applying Blindly. Start Getting Hired."
            delay={0.2}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-dark leading-tight justify-center mb-6"
          />

          <div className="min-h-[80px] mb-12">
            <TypewriterText
              text="We help candidates land full-time jobs in the US & UK and help companies hire pre-vetted talent faster."
              delay={0.8}
              className="text-lg md:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6, type: "spring", damping: 10, stiffness: 150 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href="/candidate" variant="primary" className="w-full sm:w-auto">
              I'm a Candidate
            </Button>
            <Button href="/employer" variant="secondary" className="w-full sm:w-auto bg-white/50 backdrop-blur-sm">
              I'm an Employer
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-muted"
        >
          <span className="text-sm font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-brand-accent to-transparent" />
        </motion.div>
      </section>

      {/* 2. TRUST LINE SECTION */}
      <section className="py-12 border-y border-brand-border/40 bg-brand-surface/30">
        <div className="text-center mb-10 px-6">
          <p className="text-sm md:text-base font-medium text-brand-muted tracking-widest uppercase">
            Trusted by candidates and companies across the US & UK
          </p>
        </div>
        <InfiniteMarquee
          speed={30}
          items={[
            <span key="1" className="font-heading font-bold text-3xl tracking-tighter text-brand-muted opacity-50 hover:opacity-100 transition-opacity hover:text-brand-accent cursor-default">FinTech</span>,
            <span key="2" className="font-heading font-bold text-3xl tracking-widest text-brand-muted opacity-50 hover:opacity-100 transition-opacity hover:text-brand-accent cursor-default">AI & Machine Learning</span>,
            <span key="3" className="font-heading font-bold text-3xl italic text-brand-muted opacity-50 hover:opacity-100 transition-opacity hover:text-brand-accent cursor-default">SaaS</span>,
            <span key="4" className="font-heading font-bold text-3xl tracking-tighter text-brand-muted opacity-50 hover:opacity-100 transition-opacity hover:text-brand-accent cursor-default">HealthTech</span>,
            <span key="5" className="font-heading font-bold text-3xl tracking-wider text-brand-muted opacity-50 hover:opacity-100 transition-opacity hover:text-brand-accent cursor-default">E-Commerce</span>,
          ]}
        />
      </section>

      {/* 3. WHY WE ARE DIFFERENT */}
      <section className="py-24 px-6 relative bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionHeading center={true}>Why We Are Different</SectionHeading>
            <p className="text-xl md:text-2xl font-bold text-brand-accent max-w-3xl mx-auto">
              We don't just apply for jobs — we build your hiring strategy.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {whyDifferentFeatures.map((feature, i) => (
              <motion.div
                key={i}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                className="group relative bg-brand-surface rounded-2xl border border-brand-border overflow-hidden transition-shadow duration-300 hover:shadow-warm-lg w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"
              >
                {/* Animated Top Border on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-accent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10" />

                {/* Image */}
                <motion.div
                  variants={imageReveal}
                  className="relative w-full aspect-[16/10] overflow-hidden"
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Subtle gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </motion.div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle />
                    </div>
                    <div>
                      <motion.h3
                        variants={textRevealTitle}
                        className="text-xl font-bold mb-2 text-brand-dark"
                      >
                        {feature.title}
                      </motion.h3>
                      <motion.p
                        variants={textRevealDesc}
                        className="text-brand-muted leading-relaxed"
                      >
                        {feature.desc}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATS SECTION */}
      <section className="py-20 px-6 text-white relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-[#212745] to-brand-secondary z-0" />
        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0" />

        <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {[
            { num: 200, suffix: "+", label: "Candidates Placed" },
            { num: 50, suffix: "+", label: "Hiring Partners" },
            { num: 70, suffix: "%", label: "Interview Success Rate" },
            { num: 48, prefix: "", suffix: "–72 Hrs", label: "Hiring Turnaround" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={ready ? { opacity: 1, y: 0 } : undefined}
              viewport={ready ? { once: true, amount: 0.3 } : undefined}
              transition={{ delay: i * 0.12, duration: 0.6, type: "spring", stiffness: 80, damping: 14 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.25 } }}
              className="flex flex-col items-center justify-center bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl py-6 px-4 md:py-8 md:px-6 shadow-lg shadow-black/10 transition-colors duration-300 hover:bg-white/[0.1] hover:border-white/20"
            >
              <div className="text-3xl md:text-4xl font-bold font-heading text-brand-accent mb-2">
                {stat.num === 48 ? (
                  <span className="tabular-nums font-heading whitespace-nowrap">
                    48–72 Hrs
                  </span>
                ) : (
                  <AnimatedCounter end={stat.num} suffix={stat.suffix} prefix={stat.prefix} className="tabular-nums font-heading" />
                )}
              </div>
              <p className="text-gray-300 font-semibold tracking-wide text-xs md:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. SERVICES SNAPSHOT */}
      <section className="py-24 px-6 bg-brand-bg relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionHeading center={true}>Our Services</SectionHeading>
            <p className="text-lg md:text-xl text-brand-muted max-w-2xl mx-auto">
              Tailored solutions for candidates seeking their next role and employers building winning teams.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

            {/* For Candidates */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={ready ? { opacity: 1, y: 0 } : undefined}
              viewport={ready ? { once: true, amount: 0.2 } : undefined}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-warm-lg border border-brand-border transition-shadow duration-300 hover:shadow-warm-glow"
            >
              <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center mb-8">
                <UserIcon />
              </div>
              <SectionHeading className="!mb-8 !mt-0">For Candidates</SectionHeading>
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-5"
              >
                {candidateServices.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={staggerItem}
                    className="flex items-center gap-4 text-lg text-brand-dark font-medium"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center">
                      <CheckCircle />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-10 pt-8 border-t border-brand-border">
                <Button href="/candidate" variant="outline" className="w-full">Explore Candidate Services</Button>
              </div>
            </motion.div>

            {/* For Employers */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={ready ? { opacity: 1, y: 0 } : undefined}
              viewport={ready ? { once: true, amount: 0.2 } : undefined}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="text-white rounded-3xl shadow-2xl shadow-brand-dark/20 border border-white/10 transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(26,26,46,0.4)] relative overflow-hidden"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-[#212745] to-brand-secondary z-0" />
              {/* Texture Overlay */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0" />

              <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                  <BriefcaseIcon />
                </div>
              <h2 className="text-3xl md:text-4xl mb-8 font-heading font-bold text-white relative inline-block group">
                For Employers
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "30%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute -bottom-2 left-0 h-1.5 bg-brand-accent z-0"
                />
              </h2>
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-5"
              >
                {employerServices.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={staggerItem}
                    className="flex items-center gap-4 text-lg font-medium text-white/90"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <CheckCircleLight />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-10 mt-auto pt-8 border-t border-white/10">
                <Button href="/employer" variant="primary" className="w-full">Hire Talent Now</Button>
              </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 px-6 overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto mb-16 text-center">
          <SectionHeading center={true}>Trusted by the Best</SectionHeading>
          <p className="text-xl text-brand-muted">Real stories from our candidates and hiring partners.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            speed={1000}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 3000, disableOnInteraction: true }}
            pagination={{ clickable: true }}
            className="pb-16 px-4"
          >
            {testimonials.map((testimonial, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="bg-brand-bg rounded-2xl p-8 h-full flex flex-col border border-brand-border transition-all hover:shadow-warm-lg">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => <StarIcon key={star} />)}
                  </div>
                  <p className="text-brand-dark font-medium leading-relaxed mb-8 flex-grow text-lg italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-bold font-heading text-brand-dark mb-1">{testimonial.name}</p>
                    <p className="text-sm text-brand-muted">{testimonial.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-[#212745] to-brand-secondary z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6">Start Your Journey Today</h2>
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto font-light">
              Book a Free Strategy Call
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" className="w-full sm:w-auto text-lg shadow-[0_0_40px_rgba(200,135,58,0.4)]">
                Get Started
              </Button>
              <Button href="/contact" variant="secondary" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 text-lg">
                Book a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

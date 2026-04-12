"use client";

export default function InfiniteMarquee({ items = [], speed = 30, className = "", pauseOnHover = true }) {
    return (
        <div className={`overflow-hidden relative w-full flex group ${className}`}>
            {/* Soft gradient fades on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none" />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes custom-marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-wrapper {
                    animation: custom-marquee ${speed}s linear infinite;
                }
                .group:hover .marquee-pause {
                    animation-play-state: paused;
                }
            `}} />

            <div
                className={`flex whitespace-nowrap gap-12 md:gap-24 min-w-max px-6 marquee-wrapper ${pauseOnHover ? "marquee-pause" : ""}`}
            >
                {/* Render items twice to create a seamless loop.
                    Since we translate to -50%, the second half exactly replaces the first half. */}
                {[...items, ...items].map((item, index) => (
                    <div key={index} className="flex-shrink-0 flex items-center justify-center">
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

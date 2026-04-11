"use client";

import { useState, useEffect, useRef } from "react";

export default function HeroVideo({ src, className = "" }) {
    const [isReady, setIsReady] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const videoRef = useRef(null);

    // Defer mounting the video element until after the main page structure has rendered.
    // This allows the server to send the basic HTML quickly (with the dark background showing)
    // and prevents the video from blocking the initial page load layout.
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 50); // slight delay ensures main DOM renders first
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleCanPlay = () => setIsReady(true);

        // If the video is already ready to play
        if (video.readyState >= 3) {
            setIsReady(true);
            return;
        }

        video.addEventListener("canplay", handleCanPlay);
        return () => video.removeEventListener("canplay", handleCanPlay);
    }, [isMounted]);

    // Before mounting, we return nothing. The dark hero background and overlay will be visible.
    if (!isMounted) return null;

    return (
        <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0"} ${className}`}
        >
            <source src={src} type="video/mp4" />
        </video>
    );
}

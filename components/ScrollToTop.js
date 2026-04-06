"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Fix A: Instant scroll reset on route change to prevent animation misfires
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);

    return null;
}

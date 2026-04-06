"use client";
import { useState, useEffect } from "react";

export function useScrollReady(delay = 500) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setReady(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    return ready;
}

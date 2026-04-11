"use client";

import React, { memo } from "react";
import {
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import { motion } from "framer-motion";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// We identify US and UK by their ISO 3166-1 numeric IDs from the world-atlas TopoJSON
// USA is "840", UK is "826".
const HIGHLIGHTED_COUNTRIES = ["840", "826"];

const GlobalOpportunitiesMap = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-full mx-auto relative"
        >
            <div className="absolute inset-0 bg-brand-accent/5 blur-[80px] -z-10 rounded-full" />

            <ComposableMap
                projectionConfig={{ scale: 200 }}
                className="w-full h-auto drop-shadow-md"
                viewBox="0 0 800 600"
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const isHighlighted = HIGHLIGHTED_COUNTRIES.includes(geo.id);
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={isHighlighted ? "var(--color-brand-accent)" : "var(--color-brand-surface)"}
                                    stroke={isHighlighted ? "#fff" : "var(--color-brand-border)"}
                                    strokeWidth={0.5}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { outline: "none", fill: isHighlighted ? "var(--color-brand-accent-hover)" : "var(--color-brand-surface)" },
                                        pressed: { outline: "none" },
                                    }}
                                    className="transition-colors duration-300"
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </motion.div>
    );
};

export default memo(GlobalOpportunitiesMap);

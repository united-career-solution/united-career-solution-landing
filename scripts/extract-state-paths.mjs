/**
 * Extract US state boundaries from world-atlas states TopoJSON.
 * Outputs individual state SVG paths scaled to the same viewBox as our hero map.
 * 
 * Run: node scripts/extract-state-paths.mjs
 */

const STATES_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

async function main() {
  console.log("Fetching US states TopoJSON...");
  const resp = await fetch(STATES_URL);
  const topo = await resp.json();

  const states = topo.objects.states;
  const arcs = topo.arcs;
  const transform = topo.transform;

  function decodeArc(arcIndex) {
    const reverse = arcIndex < 0;
    const idx = reverse ? ~arcIndex : arcIndex;
    const arc = arcs[idx];
    const coords = [];
    let x = 0, y = 0;
    for (const [dx, dy] of arc) {
      x += dx;
      y += dy;
      coords.push([
        x * transform.scale[0] + transform.translate[0],
        y * transform.scale[1] + transform.translate[1]
      ]);
    }
    if (reverse) coords.reverse();
    return coords;
  }

  function decodeRing(ring) {
    const coords = [];
    for (const arcIndex of ring) {
      const arcCoords = decodeArc(arcIndex);
      coords.push(...(coords.length > 0 ? arcCoords.slice(1) : arcCoords));
    }
    return coords;
  }

  function getGeometryRings(geo) {
    if (geo.type === "Polygon") {
      return geo.arcs.map(ring => decodeRing(ring));
    } else if (geo.type === "MultiPolygon") {
      return geo.arcs.flatMap(polygon => polygon.map(ring => decodeRing(ring)));
    }
    return [];
  }

  // We want to project all states into the SAME coordinate space as our hero map.
  // In our hero map, USA occupies viewBox space x: 1-49, y: ~26-49 within a 100x80 viewBox.
  // But now we're scaling up — we want the USA to fill MORE of the viewBox.
  // Let's project all continental US states (excluding Alaska, Hawaii) into a larger area.
  
  // Continental US bounds (approximate)
  const CONT_US = { minLon: -125, maxLon: -66.5, minLat: 24, maxLat: 50 };
  const ALASKA = { minLon: -180, maxLon: -130, minLat: 51, maxLat: 72 };
  
  // Target area in new viewBox (0 0 100 80) — USA takes left ~57% of width
  const USA_TARGET = { x: 1, y: 8, w: 55, h: 64 };
  const ALASKA_TARGET = { x: 1, y: 5, w: 15, h: 16 };

  // State FIPS codes to skip (non-continental)
  const SKIP_FIPS = new Set([
    "02", // Alaska (we'll handle separately as outline)
    "15", // Hawaii
    "60", // American Samoa
    "66", // Guam
    "69", // Northern Mariana Islands
    "72", // Puerto Rico
    "78", // US Virgin Islands
  ]);

  // Project coordinates
  function projectCoords(rings, bounds, target) {
    const lonRange = bounds.maxLon - bounds.minLon;
    const latRange = bounds.maxLat - bounds.minLat;
    const scaleX = target.w / lonRange;
    const scaleY = target.h / latRange;
    const scale = Math.min(scaleX, scaleY);
    
    const projW = lonRange * scale;
    const projH = latRange * scale;
    const offsetX = target.x + (target.w - projW) / 2;
    const offsetY = target.y + (target.h - projH) / 2;

    return rings.map(ring => 
      ring.map(([lon, lat]) => [
        Math.round(((lon - bounds.minLon) * scale + offsetX) * 100) / 100,
        Math.round(((bounds.maxLat - lat) * scale + offsetY) * 100) / 100,
      ])
    );
  }

  function toSvgPath(projected) {
    return projected.map(ring => {
      if (ring.length < 3) return "";
      const parts = ring.map((pt, i) => 
        i === 0 ? `M${pt[0]},${pt[1]}` : `L${pt[0]},${pt[1]}`
      );
      parts.push("Z");
      return parts.join(" ");
    }).filter(p => p.length > 0).join(" ");
  }

  // Process all continental states
  const statePaths = [];
  let alaskaPath = "";
  
  for (const geo of states.geometries) {
    const fips = geo.id;
    
    if (fips === "02") {
      // Alaska — separate smaller outline
      const rings = getGeometryRings(geo);
      // Filter only large rings (mainland Alaska)
      const bigRings = rings.filter(ring => {
        let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
        for (const [lon, lat] of ring) {
          minLon = Math.min(minLon, lon);
          maxLon = Math.max(maxLon, lon);
          minLat = Math.min(minLat, lat);
          maxLat = Math.max(maxLat, lat);
        }
        const area = (maxLon - minLon) * (maxLat - minLat);
        return area > 10; // skip tiny islands
      });
      if (bigRings.length > 0) {
        const projected = projectCoords(bigRings, ALASKA, ALASKA_TARGET);
        alaskaPath = toSvgPath(projected);
      }
      continue;
    }

    if (SKIP_FIPS.has(fips)) continue;

    const rings = getGeometryRings(geo);
    if (rings.length === 0) continue;
    
    // Filter out tiny island rings
    const significantRings = rings.filter(ring => {
      let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
      for (const [lon, lat] of ring) {
        minLon = Math.min(minLon, lon);
        maxLon = Math.max(maxLon, lon);
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
      }
      return (maxLon - minLon) > 0.2 || (maxLat - minLat) > 0.2;
    });

    if (significantRings.length === 0) continue;

    const projected = projectCoords(significantRings, CONT_US, USA_TARGET);
    const path = toSvgPath(projected);
    if (path) {
      statePaths.push(path);
    }
  }

  // Combine all state paths into one big path string for a single <path> element
  const allStatesPath = statePaths.join(" ");
  
  console.log("=== ALL US STATES (combined path for single <path> element) ===");
  console.log(allStatesPath);
  console.log(`\nTotal states: ${statePaths.length}`);
  console.log(`Total path length: ${allStatesPath.length} chars`);
  
  console.log("\n=== ALASKA PATH ===");
  console.log(alaskaPath);
  console.log(`Length: ${alaskaPath.length} chars`);

  // Calculate projected bounding box
  function getBBox(pathStr) {
    const nums = pathStr.match(/[\d.]+/g).map(Number);
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (let i = 0; i < nums.length; i += 2) {
      minX = Math.min(minX, nums[i]);
      maxX = Math.max(maxX, nums[i]);
      minY = Math.min(minY, nums[i + 1]);
      maxY = Math.max(maxY, nums[i + 1]);
    }
    return { minX, maxX, minY, maxY };
  }

  console.log("\n=== STATES BOUNDING BOX ===");
  console.log(getBBox(allStatesPath));

  // Calculate city positions in new projection
  const cityCoords = {
    "New York": [-74.006, 40.7128],
    "Los Angeles": [-118.2437, 34.0522],
    "Houston": [-95.3698, 29.7604],
    "Chicago": [-87.6298, 41.8781],
  };

  console.log("\n=== USA CITY POSITIONS (in viewBox 0 0 100 80) ===");
  const lonRange = CONT_US.maxLon - CONT_US.minLon;
  const latRange = CONT_US.maxLat - CONT_US.minLat;
  const scaleX = USA_TARGET.w / lonRange;
  const scaleY = USA_TARGET.h / latRange;
  const scale = Math.min(scaleX, scaleY);
  const projW = lonRange * scale;
  const projH = latRange * scale;
  const offsetX = USA_TARGET.x + (USA_TARGET.w - projW) / 2;
  const offsetY = USA_TARGET.y + (USA_TARGET.h - projH) / 2;

  for (const [city, [lon, lat]] of Object.entries(cityCoords)) {
    const px = (lon - CONT_US.minLon) * scale + offsetX;
    const py = (CONT_US.maxLat - lat) * scale + offsetY;
    console.log(`${city}: x=${px.toFixed(1)}, y=${py.toFixed(1)} (as %: ${px.toFixed(1)}%, ${(py / 80 * 100).toFixed(1)}%)`);
  }

  // UK city positions for the larger UK area
  // UK target: x: 63-90, y: 10-70 approx
  const UK_TARGET = { x: 63, y: 10, w: 28, h: 60 };
  const UK_BOUNDS = { minLon: -7.573, maxLon: 1.683, minLat: 49.96, maxLat: 58.634 };
  
  const ukCities = {
    "London": [-0.1276, 51.5074],
    "Manchester": [-2.2426, 53.4808],
  };

  const ukLonRange = UK_BOUNDS.maxLon - UK_BOUNDS.minLon;
  const ukLatRange = UK_BOUNDS.maxLat - UK_BOUNDS.minLat;
  const ukScaleX = UK_TARGET.w / ukLonRange;
  const ukScaleY = UK_TARGET.h / ukLatRange;
  const ukScale = Math.min(ukScaleX, ukScaleY);
  const ukProjW = ukLonRange * ukScale;
  const ukProjH = ukLatRange * ukScale;
  const ukOffsetX = UK_TARGET.x + (UK_TARGET.w - ukProjW) / 2;
  const ukOffsetY = UK_TARGET.y + (UK_TARGET.h - ukProjH) / 2;

  console.log("\n=== UK CITY POSITIONS (in viewBox 0 0 100 80) ===");
  for (const [city, [lon, lat]] of Object.entries(ukCities)) {
    const px = (lon - UK_BOUNDS.minLon) * ukScale + ukOffsetX;
    const py = (UK_BOUNDS.maxLat - lat) * ukScale + ukOffsetY;
    console.log(`${city}: x=${px.toFixed(1)}, y=${py.toFixed(1)} (as %: ${px.toFixed(1)}%, ${(py / 80 * 100).toFixed(1)}%)`);
  }

  // Project UK country outline with new bounds
  const COUNTRY_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
  const countryResp = await fetch(COUNTRY_URL);
  const countryTopo = await countryResp.json();
  
  const cArcs = countryTopo.arcs;
  const cTransform = countryTopo.transform;
  
  function decodeCountryArc(arcIndex) {
    const reverse = arcIndex < 0;
    const idx = reverse ? ~arcIndex : arcIndex;
    const arc = cArcs[idx];
    const coords = [];
    let x2 = 0, y2 = 0;
    for (const [dx, dy] of arc) {
      x2 += dx;
      y2 += dy;
      coords.push([
        x2 * cTransform.scale[0] + cTransform.translate[0],
        y2 * cTransform.scale[1] + cTransform.translate[1]
      ]);
    }
    if (reverse) coords.reverse();
    return coords;
  }

  function decodeCountryRing(ring) {
    const coords = [];
    for (const arcIndex of ring) {
      const arcCoords = decodeCountryArc(arcIndex);
      coords.push(...(coords.length > 0 ? arcCoords.slice(1) : arcCoords));
    }
    return coords;
  }

  // Find UK (826)
  for (const geo of countryTopo.objects.countries.geometries) {
    if (geo.id === "826") {
      let rings = [];
      if (geo.type === "Polygon") {
        rings = geo.arcs.map(r => decodeCountryRing(r));
      } else if (geo.type === "MultiPolygon") {
        rings = geo.arcs.flatMap(p => p.map(r => decodeCountryRing(r)));
      }
      const projected = projectCoords(rings, UK_BOUNDS, UK_TARGET);
      const path = toSvgPath(projected);
      
      // Separate by ring for GB main vs Ireland
      const projectedPaths = projected.map(ring => {
        if (ring.length < 3) return "";
        const parts = ring.map((pt, i) => 
          i === 0 ? `M${pt[0]},${pt[1]}` : `L${pt[0]},${pt[1]}`
        );
        parts.push("Z");
        return parts.join(" ");
      }).filter(p => p.length > 0);
      
      console.log("\n=== UK PATHS (projected to new larger area) ===");
      projectedPaths.forEach((p, i) => {
        console.log(`Ring ${i}: ${p}`);
        console.log(`Length: ${p.length} chars\n`);
      });
      
      console.log("UK BBOX:", getBBox(path));
    }
  }
}

main().catch(console.error);

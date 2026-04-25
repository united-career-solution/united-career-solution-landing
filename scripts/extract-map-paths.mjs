/**
 * Extract USA and UK SVG paths from world-atlas TopoJSON.
 * Converts to GeoJSON, projects with a simple equirectangular projection,
 * and outputs SVG path d-attributes scaled to a target viewBox.
 * 
 * Run: node scripts/extract-map-paths.mjs
 */

// We'll fetch the same TopoJSON the project already uses
const TOPO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// USA = 840, GBR = 826 (ISO 3166-1 numeric)
const COUNTRY_IDS = { USA: "840", GBR: "826" };

async function main() {
  console.log("Fetching TopoJSON...");
  const resp = await fetch(TOPO_URL);
  const topo = await resp.json();

  // Simple TopoJSON → GeoJSON decoder
  const countries = topo.objects.countries;
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
      // Skip first point of subsequent arcs (it's the same as last of previous)
      coords.push(...(coords.length > 0 ? arcCoords.slice(1) : arcCoords));
    }
    return coords;
  }

  function getCountryCoords(id) {
    for (const geo of countries.geometries) {
      if (geo.id === id) {
        if (geo.type === "Polygon") {
          return geo.arcs.map(ring => decodeRing(ring));
        } else if (geo.type === "MultiPolygon") {
          return geo.arcs.flatMap(polygon => polygon.map(ring => decodeRing(ring)));
        }
      }
    }
    return null;
  }

  // Get coordinates for both countries
  const usaRings = getCountryCoords(COUNTRY_IDS.USA);
  const gbrRings = getCountryCoords(COUNTRY_IDS.GBR);

  if (!usaRings || !gbrRings) {
    console.error("Could not find country data!");
    return;
  }

  console.log(`USA: ${usaRings.length} rings`);
  console.log(`GBR: ${gbrRings.length} rings`);

  // Convert to SVG paths using equirectangular projection
  // We want USA to occupy the left portion and UK the right portion of a 100x80 viewBox

  // First, let's see the bounding boxes
  function getBBox(rings) {
    let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
    for (const ring of rings) {
      for (const [lon, lat] of ring) {
        minLon = Math.min(minLon, lon);
        maxLon = Math.max(maxLon, lon);
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
      }
    }
    return { minLon, maxLon, minLat, maxLat };
  }

  const usaBBox = getBBox(usaRings);
  const gbrBBox = getBBox(gbrRings);
  
  console.log("USA bbox:", usaBBox);
  console.log("GBR bbox:", gbrBBox);

  // Filter USA rings — skip small islands, keep only significant landmasses
  // Continental US roughly: lon -130 to -65, lat 24 to 50
  // Alaska roughly: lon -170 to -130, lat 51 to 72
  const usaMainland = usaRings.filter(ring => {
    const bbox = getBBox([ring]);
    const area = (bbox.maxLon - bbox.minLon) * (bbox.maxLat - bbox.minLat);
    // Keep rings that are large enough (skip tiny islands like Guam, Hawaii individual islets)
    return area > 5;
  });

  console.log(`USA filtered to ${usaMainland.length} significant rings`);

  // Project both countries into a shared SVG viewBox (100 x 80)
  // USA occupies left side (x: 2–48), UK occupies right side (x: 62–82)
  // This gives visual separation with room for connection lines

  function projectRings(rings, targetX, targetY, targetW, targetH) {
    const bbox = getBBox(rings);
    const lonRange = bbox.maxLon - bbox.minLon;
    const latRange = bbox.maxLat - bbox.minLat;
    
    // Maintain aspect ratio
    const scaleX = targetW / lonRange;
    const scaleY = targetH / latRange;
    const scale = Math.min(scaleX, scaleY);
    
    const projW = lonRange * scale;
    const projH = latRange * scale;
    const offsetX = targetX + (targetW - projW) / 2;
    const offsetY = targetY + (targetH - projH) / 2;

    return rings.map(ring => {
      return ring.map(([lon, lat]) => {
        const x = (lon - bbox.minLon) * scale + offsetX;
        // Flip Y (SVG y increases downward, lat increases upward)
        const y = (bbox.maxLat - lat) * scale + offsetY;
        return [Math.round(x * 100) / 100, Math.round(y * 100) / 100];
      });
    });
  }

  const usaProjected = projectRings(usaMainland, 1, 5, 48, 65);
  const gbrProjected = projectRings(gbrRings, 62, 8, 22, 55);

  // Convert to SVG path d-attribute
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

  const usaPath = toSvgPath(usaProjected);
  const gbrPath = toSvgPath(gbrProjected);

  console.log("\n=== USA SVG PATH ===");
  console.log(usaPath);
  console.log(`\nLength: ${usaPath.length} chars`);
  
  console.log("\n=== GBR SVG PATH ===");
  console.log(gbrPath);
  console.log(`\nLength: ${gbrPath.length} chars`);

  // Also output bounding boxes of the projected maps (for placing city markers)
  function getProjectedBBox(projected) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const ring of projected) {
      for (const [x, y] of ring) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
    return { minX, maxX, minY, maxY };
  }

  console.log("\n=== PROJECTED BOUNDING BOXES (in viewBox 0 0 100 80) ===");
  console.log("USA:", getProjectedBBox(usaProjected));
  console.log("GBR:", getProjectedBBox(gbrProjected));

  // Calculate approximate city positions in the viewBox
  // Using real coordinates and projecting them
  const cityCoords = {
    "New York": [-74.006, 40.7128],
    "Los Angeles": [-118.2437, 34.0522],
    "Houston": [-95.3698, 29.7604],
    "Chicago": [-87.6298, 41.8781],
    "London": [-0.1276, 51.5074],
    "Manchester": [-2.2426, 53.4808],
  };

  console.log("\n=== CITY POSITIONS (percentage of viewBox 100x80) ===");
  
  // Project USA cities
  const usaBB = getBBox(usaMainland);
  const usaPBB = getProjectedBBox(usaProjected);
  for (const [city, [lon, lat]] of Object.entries(cityCoords)) {
    if (lon < -50) { // USA city
      const lonRange = usaBB.maxLon - usaBB.minLon;
      const latRange = usaBB.maxLat - usaBB.minLat;
      const scaleX = (usaPBB.maxX - usaPBB.minX) / lonRange;
      const scaleY = (usaPBB.maxY - usaPBB.minY) / latRange;
      const scale = Math.min(scaleX, scaleY);
      const projW = lonRange * scale;
      const projH = latRange * scale;
      const offsetX = usaPBB.minX + ((usaPBB.maxX - usaPBB.minX) - projW) / 2;
      const offsetY = usaPBB.minY + ((usaPBB.maxY - usaPBB.minY) - projH) / 2;
      
      const px = ((lon - usaBB.minLon) * scale + offsetX);
      const py = ((usaBB.maxLat - lat) * scale + offsetY);
      console.log(`${city}: x=${(px).toFixed(1)}  y=${(py).toFixed(1)}   (as % of 100x80: ${(px).toFixed(1)}%, ${(py/80*100).toFixed(1)}%)`);
    }
  }
  
  // Project UK cities
  const gbrBB = getBBox(gbrRings);
  const gbrPBB = getProjectedBBox(gbrProjected);
  for (const [city, [lon, lat]] of Object.entries(cityCoords)) {
    if (lon > -50) { // UK city
      const lonRange = gbrBB.maxLon - gbrBB.minLon;
      const latRange = gbrBB.maxLat - gbrBB.minLat;
      const scaleX = (gbrPBB.maxX - gbrPBB.minX) / lonRange;
      const scaleY = (gbrPBB.maxY - gbrPBB.minY) / latRange;
      const scale = Math.min(scaleX, scaleY);
      const projW = lonRange * scale;
      const projH = latRange * scale;
      const offsetX = gbrPBB.minX + ((gbrPBB.maxX - gbrPBB.minX) - projW) / 2;
      const offsetY = gbrPBB.minY + ((gbrPBB.maxY - gbrPBB.minY) - projH) / 2;
      
      const px = ((lon - gbrBB.minLon) * scale + offsetX);
      const py = ((gbrBB.maxLat - lat) * scale + offsetY);
      console.log(`${city}: x=${(px).toFixed(1)}  y=${(py).toFixed(1)}   (as % of 100x80: ${(px).toFixed(1)}%, ${(py/80*100).toFixed(1)}%)`);
    }
  }
}

main().catch(console.error);

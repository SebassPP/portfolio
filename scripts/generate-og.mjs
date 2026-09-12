/**
 * Genera public/og.png (1200×630) con los tokens del tema oscuro.
 * Se ejecuta a mano cuando cambien el nombre o el rol: `node scripts/generate-og.mjs`.
 * El PNG resultante se commitea; en v1 no hay generación dinámica de OG.
 */
import { writeFileSync } from "node:fs";

import sharp from "sharp";

const BG = "#0F0F10";
const FG = "#E8E8E8";
const FG_MUTED = "#9A9A9F";
const ACCENT = "#D99A1E";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="80" y="368" width="64" height="3" fill="${ACCENT}"/>
  <text x="80" y="338" fill="${FG}" font-family="Helvetica, Arial, sans-serif" font-size="84" font-weight="600">Sebastián Pardo</text>
  <text x="80" y="428" fill="${FG_MUTED}" font-family="Helvetica, Arial, sans-serif" font-size="40">Backend &amp; DevOps Engineer</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(new URL("../public/og.png", import.meta.url), png);
console.log(`public/og.png: ${(png.length / 1024).toFixed(1)} kB`);

/**
 * AFROBIAN HUB — temporary media generator.
 *
 * Generates ORIGINAL placeholder artwork (SVG) for products, editorial
 * campaign frames, creator portraits and culture covers. Every file is written
 * to /public/media at a stable path that the data files reference, so real
 * photography can replace them 1:1 (e.g. swap `hoodie-01-a.svg` for a `.jpg`
 * and update the path in lib/products.ts).
 *
 * Run: node scripts/generate-media.mjs
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "media");

const C = {
  blaze: "#FF7900",
  ink: "#080808",
  bone: "#F2EEE7",
  coal: "#292929",
  sand: "#C9B79C",
  clay: "#9C4A2A",
  olive: "#4B5137",
  sky: "#8FA6B2",
  smoke: "#6B6B6B",
  cream: "#E6DCCB",
  skinA: "#3B2418",
  skinB: "#5A3824",
  skinC: "#7A4E33",
};

// Anton (SIL Open Font License), subset to Latin caps/digits and embedded so
// slogans render identically on every device, even inside <img> tags.
const FONT_B64 = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "assets", "anton-sub.woff2")).toString("base64");
const FONT_CSS = `<style>@font-face{font-family:'AFB Display';src:url(data:font/woff2;base64,${FONT_B64}) format('woff2');}</style>`;
const DISPLAY = "'AFB Display', Impact, 'Arial Narrow Bold', sans-serif";

const SLOGANS = {
  guy: ["BLOOCK", "THAT", "GUYYY"],
  pitch: ["BLOOCK", "THAT", "PITCH"],
};
const MONO = "'JetBrains Mono', 'Courier New', monospace";

function write(rel, svg) {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg.trim() + "\n");
}

/* ------------------------------------------------------------------ */
/* shared defs                                                         */
/* ------------------------------------------------------------------ */
function defs(id, { grain = 0.12, dots = C.ink } = {}) {
  return `
  <defs>
    ${FONT_CSS}
    <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="n"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="table" tableValues="0 ${grain}"/></feComponentTransfer>
    </filter>
    <filter id="drop-${id}" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="28" stdDeviation="26" flood-color="#000" flood-opacity="0.28"/></filter>
    <filter id="soft-${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
    <filter id="blur-${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="60"/></filter>
    <pattern id="dots-${id}" width="14" height="14" patternUnits="userSpaceOnUse">
      <circle cx="7" cy="7" r="3.2" fill="${dots}"/>
    </pattern>
    <pattern id="lines-${id}" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
      <rect width="4" height="10" fill="${dots}"/>
    </pattern>
    <linearGradient id="shade-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0.16"/>
      <stop offset="0.55" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.32"/>
    </linearGradient>
    <radialGradient id="fade-${id}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="halo-${id}"><rect width="100%" height="100%" fill="url(#fade-${id})"/></mask>
  </defs>`;
}

function stamp(x, y, text, color = C.ink, size = 15, anchor = "start") {
  return `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${size}" letter-spacing="2" fill="${color}" text-anchor="${anchor}">${text}</text>`;
}

/* ------------------------------------------------------------------ */
/* garments (designed in a 800 x 1000 frame, centre x = 400)           */
/* ------------------------------------------------------------------ */
function rib(x1, y1, x2, y2, n, color) {
  let s = "";
  for (let i = 1; i < n; i++) {
    const x = x1 + ((x2 - x1) * i) / n;
    s += `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${color}" stroke-opacity="0.25" stroke-width="2"/>`;
  }
  return s;
}

/** The "block" button: circle with a diagonal slash. */
function blockIcon(color, r = 50, sw = r * 0.26) {
  const d = r * 0.7;
  return `<circle r="${r}" fill="none" stroke="${color}" stroke-width="${sw}"/><line x1="${-d}" y1="${d}" x2="${d}" y2="${-d}" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"/>`;
}

/** Stacked, justified slogan block (every line forced to the same width). */
function stack(lines, color, width, size, gap = 0.94) {
  return lines
    .map(
      (l, i) =>
        `<text x="${-width / 2}" y="${i * size * gap}" font-family="${DISPLAY}" font-size="${size}" fill="${color}" textLength="${width}" lengthAdjust="spacingAndGlyphs">${l}</text>`,
    )
    .join("");
}

function chestPrint(kind, x, y, color, scale = 1) {
  const t = `translate(${x} ${y}) scale(${scale})`;
  switch (kind) {
    case "sun":
      return `<g transform="${t}"><circle r="46" fill="${color}"/>${[...Array(12)]
        .map((_, i) => {
          const a = (i * Math.PI) / 6;
          return `<line x1="${Math.cos(a) * 58}" y1="${Math.sin(a) * 58}" x2="${Math.cos(a) * 78}" y2="${Math.sin(a) * 78}" stroke="${color}" stroke-width="7" stroke-linecap="round"/>`;
        })
        .join("")}</g>`;
    case "word":
      return `<g transform="${t}"><text x="0" y="0" font-family="${DISPLAY}" font-size="54" letter-spacing="1" fill="${color}" text-anchor="middle">AFROBIAN</text><text x="0" y="30" font-family="${MONO}" font-size="16" letter-spacing="6" fill="${color}" text-anchor="middle">HUB — DROP 01</text></g>`;
    case "block":
      return `<g transform="${t}"><rect x="-70" y="-55" width="140" height="110" fill="${color}"/><text x="0" y="22" font-family="${DISPLAY}" font-size="66" fill="${C.ink}" text-anchor="middle">A/H</text></g>`;
    case "tab":
      return `<g transform="${t}"><rect x="-22" y="-12" width="44" height="24" rx="3" fill="${color}"/><text x="0" y="6" font-family="${MONO}" font-size="13" font-weight="700" fill="${C.ink}" text-anchor="middle">AFB</text></g>`;
    case "star":
      return `<g transform="${t}"><path d="M0 -60 L14 -14 L60 0 L14 14 L0 60 L-14 14 L-60 0 L-14 -14 Z" fill="${color}"/></g>`;
    case "guy":
    case "pitch":
      return `<g transform="${t}">${stack(SLOGANS[kind], color, 220, 66)}</g>`;
    case "guy-small":
    case "pitch-small":
      return `<g transform="${t}">${stack(SLOGANS[kind.split("-")[0]], color, 84, 26)}</g>`;
    case "blocked-guy":
    case "blocked-pitch": {
      const line = SLOGANS[kind.split("-")[1]].join(" ");
      return `<g transform="${t}"><g transform="translate(0 -20)">${blockIcon(color, 62)}</g><text x="-125" y="92" font-family="${DISPLAY}" font-size="36" fill="${color}" textLength="250" lengthAdjust="spacingAndGlyphs">${line}</text></g>`;
    }
    case "icon":
      return `<g transform="${t}">${blockIcon(color, 30)}</g>`;
    default:
      return "";
  }
}

const GARMENTS = {
  tee({ fill, accent, print }, id) {
    return `
    <path d="M250 235 L335 200 Q400 240 465 200 L550 235 L645 335 L578 392 L548 360 L548 772 Q400 790 252 772 L252 360 L222 392 L155 335 Z" fill="${fill}"/>
    <path d="M335 200 Q400 240 465 200 Q455 222 400 232 Q345 222 335 200 Z" fill="#000" fill-opacity="0.35"/>
    <path d="M250 235 L335 200 Q400 240 465 200 L550 235 L645 335 L578 392 L548 360 L548 772 Q400 790 252 772 L252 360 L222 392 L155 335 Z" fill="url(#shade-${id})"/>
    <path d="M300 520 Q330 600 310 700 M500 470 Q470 560 492 680" stroke="#000" stroke-opacity="0.12" stroke-width="5" fill="none"/>
    ${chestPrint(print, 400, print === "guy" || print === "pitch" ? 350 : 380, accent)}`;
  },
  babytee({ fill, accent, print }, id) {
    return `
    <path d="M285 250 L350 222 Q400 255 450 222 L515 250 L585 320 L540 362 L515 342 Q505 470 520 640 Q400 662 280 640 Q295 470 285 342 L260 362 L215 320 Z" fill="${fill}"/>
    <path d="M350 222 Q400 255 450 222 Q442 240 400 248 Q358 240 350 222 Z" fill="#000" fill-opacity="0.35"/>
    <path d="M285 250 L350 222 Q400 255 450 222 L515 250 L585 320 L540 362 L515 342 Q505 470 520 640 Q400 662 280 640 Q295 470 285 342 L260 362 L215 320 Z" fill="url(#shade-${id})"/>
    ${chestPrint(print, 400, print === "guy" || print === "pitch" ? 340 : 380, accent, 0.72)}`;
  },
  hoodie({ fill, accent, print, cropped }, id) {
    const hem = cropped ? 630 : 775;
    return `
    <path d="M318 248 Q298 128 400 112 Q502 128 482 248 Z" fill="${fill}"/>
    <path d="M318 248 Q298 128 400 112 Q502 128 482 248 Z" fill="#000" fill-opacity="0.2"/>
    <path d="M345 245 Q345 170 400 160 Q455 170 455 245 Q400 262 345 245 Z" fill="#000" fill-opacity="0.55"/>
    <path d="M330 235 Q400 268 470 235 L560 268 Q612 300 626 380 L662 690 L600 706 L560 430 L555 ${hem} Q400 ${hem + 18} 245 ${hem} L240 430 L200 706 L138 690 L174 380 Q188 300 240 268 Z" fill="${fill}"/>
    <path d="M330 235 Q400 268 470 235 L560 268 Q612 300 626 380 L662 690 L600 706 L560 430 L555 ${hem} Q400 ${hem + 18} 245 ${hem} L240 430 L200 706 L138 690 L174 380 Q188 300 240 268 Z" fill="url(#shade-${id})"/>
    <path d="M138 690 L200 706 L196 740 L134 724 Z M662 690 L600 706 L604 740 L666 724 Z" fill="${fill}"/>
    <path d="M138 690 L200 706 L196 740 L134 724 Z M662 690 L600 706 L604 740 L666 724 Z" fill="#000" fill-opacity="0.25"/>
    ${rib(134, 700, 200, 735, 6, "#000")}${rib(600, 700, 666, 735, 6, "#000")}
    <rect x="245" y="${hem - 40}" width="310" height="44" fill="#000" fill-opacity="0.22"/>
    ${rib(245, hem - 40, 555, hem + 4, 22, "#000")}
    ${cropped ? "" : `<path d="M300 580 L500 580 L540 ${hem - 52} L260 ${hem - 52} Z" fill="#000" fill-opacity="0.14"/>`}
    <line x1="378" y1="255" x2="370" y2="345" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
    <line x1="422" y1="255" x2="430" y2="345" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
    ${chestPrint(print, 400, print === "guy" || print === "pitch" ? 372 : 450, accent, cropped ? 0.85 : 1)}`;
  },
  jacket({ fill, accent, print }, id) {
    return `
    <path d="M330 222 L400 262 L470 222 L560 258 Q612 292 626 372 L662 690 L600 706 L560 430 L556 770 Q400 788 244 770 L240 430 L200 706 L138 690 L174 372 Q188 292 240 258 Z" fill="${fill}"/>
    <path d="M330 222 L400 262 L470 222 L560 258 Q612 292 626 372 L662 690 L600 706 L560 430 L556 770 Q400 788 244 770 L240 430 L200 706 L138 690 L174 372 Q188 292 240 258 Z" fill="url(#shade-${id})"/>
    <path d="M330 222 L400 262 L470 222 L478 200 L400 236 L322 200 Z" fill="#000" fill-opacity="0.4"/>
    <path d="M182 360 L150 690 L170 694 L202 372 Z M618 360 L650 690 L630 694 L598 372 Z" fill="${accent}"/>
    <line x1="400" y1="262" x2="400" y2="780" stroke="#000" stroke-opacity="0.55" stroke-width="5"/>
    <line x1="404" y1="262" x2="404" y2="780" stroke="#fff" stroke-opacity="0.25" stroke-width="2" stroke-dasharray="4 5"/>
    <rect x="244" y="735" width="312" height="40" fill="#000" fill-opacity="0.25"/>
    <path d="M280 560 L345 560 M455 560 L520 560" stroke="#000" stroke-opacity="0.45" stroke-width="5"/>
    ${chestPrint(print, 470, 330, accent)}`;
  },
  vest({ fill, accent, print = "icon" }, id) {
    let quilts = "";
    for (let y = 330; y < 760; y += 62) quilts += `<path d="M262 ${y} Q400 ${y + 16} 538 ${y}" stroke="#000" stroke-opacity="0.28" stroke-width="4" fill="none"/>`;
    return `
    <path d="M320 215 L400 250 L480 215 L540 245 Q520 320 550 380 L556 772 Q400 795 244 772 L250 380 Q280 320 260 245 Z" fill="${fill}"/>
    <path d="M320 215 L400 250 L480 215 L540 245 Q520 320 550 380 L556 772 Q400 795 244 772 L250 380 Q280 320 260 245 Z" fill="url(#shade-${id})"/>
    <path d="M318 200 L400 236 L482 200 L486 222 L400 260 L314 222 Z" fill="#000" fill-opacity="0.35"/>
    ${quilts}
    <line x1="400" y1="250" x2="400" y2="785" stroke="#000" stroke-opacity="0.5" stroke-width="5"/>
    ${chestPrint(print, 470, 330, accent, print.endsWith("small") ? 1 : 0.9)}`;
  },
  cargo({ fill, accent, wide, print }, id) {
    const flare = wide ? 60 : 0;
    return `
    <path d="M282 180 L518 180 L${545 + flare} 840 L${440 + flare / 3} 852 L405 360 L395 360 L${360 - flare / 3} 852 L${255 - flare} 840 Z" fill="${fill}"/>
    <path d="M282 180 L518 180 L${545 + flare} 840 L${440 + flare / 3} 852 L405 360 L395 360 L${360 - flare / 3} 852 L${255 - flare} 840 Z" fill="url(#shade-${id})"/>
    <rect x="280" y="180" width="240" height="38" fill="#000" fill-opacity="0.25"/>
    ${[300, 340, 460, 500].map((x) => `<rect x="${x - 5}" y="176" width="10" height="46" fill="#000" fill-opacity="0.35"/>`).join("")}
    <path d="M${262 - flare / 2} 470 L340 470 L338 600 L${258 - flare / 2} 600 Z M${538 + flare / 2} 470 L460 470 L462 600 L${542 + flare / 2} 600 Z" fill="#000" fill-opacity="0.18" stroke="#000" stroke-opacity="0.3" stroke-width="3"/>
    <path d="M${262 - flare / 2} 470 L340 470 L340 500 L${261 - flare / 2} 500 Z M${538 + flare / 2} 470 L460 470 L460 500 L${539 + flare / 2} 500 Z" fill="#000" fill-opacity="0.2"/>
    <path d="M395 225 L395 340" stroke="#000" stroke-opacity="0.35" stroke-width="4"/>
    <path d="M330 700 Q340 760 330 830 M470 700 Q460 760 470 830" stroke="#000" stroke-opacity="0.15" stroke-width="5" fill="none"/>
    <rect x="${(255 - flare) + 10}" y="815" width="${80 + flare / 2}" height="12" fill="${accent}"/>
    ${print ? `<g transform="translate(${490 + flare / 3} 640) rotate(-90)"><text x="0" y="0" font-family="${DISPLAY}" font-size="30" fill="${accent}" textLength="160" lengthAdjust="spacingAndGlyphs">${SLOGANS[print].join(" ")}</text></g>` : ""}`;
  },
  shorts({ fill, accent }, id) {
    return `
    <path d="M272 300 L528 300 L568 640 L432 656 L404 470 L396 470 L368 656 L232 640 Z" fill="${fill}"/>
    <path d="M272 300 L528 300 L568 640 L432 656 L404 470 L396 470 L368 656 L232 640 Z" fill="url(#shade-${id})"/>
    <rect x="270" y="300" width="260" height="36" fill="#000" fill-opacity="0.28"/>
    <path d="M250 600 L560 600" stroke="${accent}" stroke-width="0"/>
    <path d="M236 610 L370 624 M564 610 L430 624" stroke="${accent}" stroke-width="8"/>
    <line x1="388" y1="336" x2="378" y2="420" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
    <line x1="412" y1="336" x2="422" y2="420" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
    ${chestPrint("tab", 500, 560, accent)}`;
  },
  cap({ fill, accent, print = "guy" }, id) {
    return `
    <path d="M230 560 Q236 340 400 322 Q564 340 570 560 Z" fill="${fill}"/>
    <path d="M230 560 Q236 340 400 322 Q564 340 570 560 Z" fill="url(#shade-${id})"/>
    <path d="M400 322 L400 560 M318 340 Q300 450 300 560 M482 340 Q500 450 500 560" stroke="#000" stroke-opacity="0.22" stroke-width="4" fill="none"/>
    <circle cx="400" cy="326" r="14" fill="${fill}" stroke="#000" stroke-opacity="0.3" stroke-width="3"/>
    <path d="M210 562 Q400 520 590 562 Q610 610 560 640 Q400 600 240 640 Q190 610 210 562 Z" fill="${fill}"/>
    <path d="M210 562 Q400 520 590 562 Q610 610 560 640 Q400 600 240 640 Q190 610 210 562 Z" fill="#000" fill-opacity="0.3"/>
    ${print === "icon"
      ? `<g transform="translate(400 450)">${blockIcon(accent, 46)}</g>`
      : `<g transform="translate(400 402)">${stack(SLOGANS[print], accent, 150, 46)}</g>`}`;
  },
  beanie({ fill, accent, print = "icon" }, id) {
    return `
    <path d="M262 600 Q258 330 400 310 Q542 330 538 600 Z" fill="${fill}"/>
    <path d="M262 600 Q258 330 400 310 Q542 330 538 600 Z" fill="url(#shade-${id})"/>
    ${rib(262, 360, 538, 600, 18, "#000")}
    <rect x="245" y="560" width="310" height="120" rx="14" fill="${fill}"/>
    <rect x="245" y="560" width="310" height="120" rx="14" fill="#000" fill-opacity="0.18"/>
    ${rib(245, 560, 555, 680, 24, "#000")}
    ${print === "icon"
      ? `<g transform="translate(400 620)"><rect x="-44" y="-36" width="88" height="72" rx="4" fill="${accent}"/>${blockIcon(fill, 22, 7)}</g>`
      : `<g transform="translate(400 600)"><rect x="-90" y="-26" width="180" height="62" rx="4" fill="${accent}"/><text x="-74" y="22" font-family="${DISPLAY}" font-size="40" fill="${fill}" textLength="148" lengthAdjust="spacingAndGlyphs">${SLOGANS[print].join(" ")}</text></g>`}`;
  },
  tote({ fill, accent, print = "pitch" }, id) {
    return `
    <path d="M330 380 Q330 210 400 210 Q470 210 470 380" stroke="${fill}" stroke-width="22" fill="none"/>
    <path d="M330 380 Q330 210 400 210 Q470 210 470 380" stroke="#000" stroke-opacity="0.25" stroke-width="22" fill="none"/>
    <rect x="235" y="360" width="330" height="420" fill="${fill}"/>
    <rect x="235" y="360" width="330" height="420" fill="url(#shade-${id})"/>
    <g transform="translate(400 490)">${stack(SLOGANS[print], accent, 250, 82)}</g>
    ${stamp(400, 700, "CARRY THE CULTURE", accent, 15, "middle")}`;
  },
};

/* ------------------------------------------------------------------ */
/* product shots                                                       */
/* ------------------------------------------------------------------ */
const STUDIO = "#F2F2F0";
const SCALE = { cap: 1.35, beanie: 1.35, tote: 1.1, babytee: 1.15, shorts: 1.15 };

/** Clean studio product shot: light backdrop, soft floor shadow, no overlays. */
function productShot({ id, garment, fill, accent, print, bg, cropped, wide, variant }) {
  const W = 800;
  const H = 1000;
  const sid = `${id}-${variant}`;
  const g = GARMENTS[garment]({ fill, accent, print, cropped, wide }, sid);
  const k = SCALE[garment] ?? 1;
  const back = variant === "c" ? bg : STUDIO;
  let transform = `translate(400 490) scale(${k}) translate(-400 -490)`;
  if (variant === "b") transform = `translate(400 470) scale(${1.9 * k}) translate(-400 ${garment === "cap" || garment === "beanie" ? -470 : -420})`;
  if (variant === "c") transform = `translate(400 500) rotate(-6) scale(${0.92 * k}) translate(-400 -500)`;
  const dark = back === C.ink || back === C.coal;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  ${defs(sid)}
  <rect width="${W}" height="${H}" fill="${back}"/>
  ${variant !== "b" ? `<ellipse cx="400" cy="${garment === "cap" || garment === "beanie" ? 760 : 905}" rx="${230 * k}" ry="26" fill="#000" opacity="${dark ? 0.55 : 0.16}" filter="url(#soft-${sid})"/>` : ""}
  <g transform="${transform}">${g}</g>
</svg>`;
}

/** Place a garment in a composition with a soft drop shadow. */
function piece(type, opts, x, y, s = 1, rot = 0, id = "p") {
  const g = GARMENTS[type](opts, id);
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(-400 -490)" filter="url(#drop-${id})">${g}</g>`;
}

/* ================================================================== */
/* PRODUCTS                                                            */
/* ================================================================== */
const products = [
  { id: "bloock-that-guyyy-heavy-hoodie", garment: "hoodie", fill: C.ink, accent: C.blaze, print: "guy", bgs: [C.bone, C.blaze, C.coal] },
  { id: "bloock-that-pitch-heavy-hoodie", garment: "hoodie", fill: C.bone, accent: C.ink, print: "pitch", bgs: [C.blaze, C.coal, C.sand] },
  { id: "bloock-that-guyyy-tee", garment: "tee", fill: C.bone, accent: C.ink, print: "guy", bgs: [C.blaze, C.coal, C.ink] },
  { id: "bloock-that-pitch-tee", garment: "tee", fill: C.ink, accent: C.blaze, print: "pitch", bgs: [C.bone, C.blaze, C.coal] },
  { id: "blocked-icon-tee", garment: "tee", fill: C.blaze, accent: C.ink, print: "blocked-guy", bgs: [C.ink, C.bone, C.coal] },
  { id: "bloock-that-pitch-track-jacket", garment: "jacket", fill: C.coal, accent: C.blaze, print: "pitch-small", bgs: [C.bone, C.blaze, C.sand] },
  { id: "blocked-puffer-vest", garment: "vest", fill: C.blaze, accent: C.ink, print: "icon", bgs: [C.ink, C.bone, C.coal] },
  { id: "bloock-cargo-pant", garment: "cargo", fill: C.olive, accent: C.blaze, print: "guy", bgs: [C.bone, C.sand, C.coal] },
  { id: "bloock-that-guyyy-cropped-hoodie", garment: "hoodie", cropped: true, fill: C.blaze, accent: C.ink, print: "guy", bgs: [C.ink, C.bone, C.coal] },
  { id: "bloock-that-pitch-cropped-hoodie", garment: "hoodie", cropped: true, fill: C.clay, accent: C.bone, print: "pitch", bgs: [C.bone, C.ink, C.sand] },
  { id: "bloock-wide-leg-cargo", garment: "cargo", wide: true, fill: C.sand, accent: C.ink, print: "pitch", bgs: [C.coal, C.bone, C.blaze] },
  { id: "bloock-that-pitch-baby-tee", garment: "babytee", fill: C.bone, accent: C.blaze, print: "pitch", bgs: [C.ink, C.blaze, C.coal] },
  { id: "blocked-baby-tee", garment: "babytee", fill: C.ink, accent: C.blaze, print: "blocked-pitch", bgs: [C.blaze, C.bone, C.coal] },
  { id: "bloock-that-guyyy-cap", garment: "cap", fill: C.ink, accent: C.blaze, print: "guy", bgs: [C.bone, C.blaze, C.coal] },
  { id: "bloock-that-pitch-cap", garment: "cap", fill: C.bone, accent: C.ink, print: "pitch", bgs: [C.blaze, C.coal, C.ink] },
  { id: "blocked-beanie", garment: "beanie", fill: C.blaze, accent: C.ink, print: "icon", bgs: [C.ink, C.bone, C.coal] },
  { id: "bloock-that-pitch-tote", garment: "tote", fill: C.bone, accent: C.ink, print: "pitch", bgs: [C.blaze, C.coal, C.ink] },
  { id: "bloock-coach-jacket", garment: "jacket", fill: C.ink, accent: C.bone, print: "guy-small", bgs: [C.blaze, C.bone, C.coal] },
];

products.forEach((p) => {
  ["a", "b", "c"].forEach((variant, i) => {
    write(
      `products/${p.id}-${variant}.svg`,
      productShot({ ...p, bg: p.bgs[i], variant, id: p.id.replace(/-/g, "").slice(0, 12), label: p.id.toUpperCase().replace(/-/g, " ") }),
    );
  });
});

/* ================================================================== */
/* EDITORIAL — product-led compositions                                */
/* ================================================================== */
function comp(name, w, h, bg, body) {
  const id = name.replace(/[^a-z0-9]/gi, "");
  write(`editorial/${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${defs(id)}<rect width="${w}" height="${h}" fill="${bg}"/>${body(id, w, h)}</svg>`);
}
const bigWord = (text, x, y, size, color, opacity = 1, anchor = "middle") =>
  `<text x="${x}" y="${y}" font-family="${DISPLAY}" font-size="${size}" fill="${color}" opacity="${opacity}" text-anchor="${anchor}">${text}</text>`;
/** Word stretched to an exact width (x = left edge). */
const fitWord = (text, x, y, width, size, color, opacity = 1) =>
  `<text x="${x}" y="${y}" font-family="${DISPLAY}" font-size="${size}" fill="${color}" opacity="${opacity}" textLength="${width}" lengthAdjust="spacingAndGlyphs">${text}</text>`;

const O = {
  guyHoodie: { fill: C.ink, accent: C.blaze, print: "guy" },
  pitchHoodie: { fill: C.bone, accent: C.ink, print: "pitch" },
  guyCrop: { fill: C.blaze, accent: C.ink, print: "guy", cropped: true },
  pitchCrop: { fill: C.clay, accent: C.bone, print: "pitch", cropped: true },
  guyTee: { fill: C.bone, accent: C.ink, print: "guy" },
  pitchTee: { fill: C.ink, accent: C.blaze, print: "pitch" },
  iconTee: { fill: C.blaze, accent: C.ink, print: "blocked-guy" },
  guyCap: { fill: C.ink, accent: C.blaze, print: "guy" },
  pitchCap: { fill: C.bone, accent: C.ink, print: "pitch" },
  cargo: { fill: C.olive, accent: C.blaze, print: "guy" },
  wideCargo: { fill: C.sand, accent: C.ink, print: "pitch", wide: true },
  vest: { fill: C.blaze, accent: C.ink, print: "icon" },
  beanie: { fill: C.blaze, accent: C.ink, print: "icon" },
  tote: { fill: C.bone, accent: C.ink, print: "pitch" },
  track: { fill: C.coal, accent: C.blaze, print: "pitch-small" },
};

/* hero — wide (desktop) and tall (mobile) */
comp("hero-wide", 2400, 1350, C.blaze, (id, w, h) => `
  ${fitWord("BLOOCK", w * 0.04, h * 0.47, w * 0.92, 520, "#EE7200")}
  ${fitWord("THAT GUYYY", w * 0.04, h * 0.95, w * 0.92, 520, "#EE7200")}
  ${piece("tee", O.guyTee, w * 0.85, h * 0.46, 1.05, 9, id)}
  ${piece("hoodie", O.guyHoodie, w * 0.67, h * 0.52, 1.45, -5, id)}
  ${piece("cap", O.guyCap, w * 0.52, h * 0.8, 0.9, -12, id)}`);
comp("hero-tall", 1200, 1600, C.blaze, (id, w, h) => `
  ${fitWord("BLOOCK", w * 0.05, h * 0.3, w * 0.9, 420, "#EE7200")}
  ${fitWord("THAT", w * 0.05, h * 0.6, w * 0.9, 420, "#EE7200")}
  ${fitWord("GUYYY", w * 0.05, h * 0.9, w * 0.9, 420, "#EE7200")}
  ${piece("hoodie", O.guyHoodie, w * 0.55, h * 0.44, 1.4, -5, id)}
  ${piece("cap", O.guyCap, w * 0.3, h * 0.72, 0.85, -12, id)}`);

/* men / women edits */
comp("panel-men", 1000, 1250, "#E7E4DF", (id, w, h) => `
  ${piece("cargo", O.cargo, w * 0.5, h * 0.66, 1.0, 4, id)}
  ${piece("hoodie", O.guyHoodie, w * 0.47, h * 0.36, 0.95, -6, id)}
  ${piece("cap", O.guyCap, w * 0.8, h * 0.17, 0.62, 14, id)}`);
comp("panel-women", 1000, 1250, "#1E1E1E", (id, w, h) => `
  ${piece("cargo", O.wideCargo, w * 0.5, h * 0.68, 1.0, -4, id)}
  ${piece("hoodie", O.guyCrop, w * 0.5, h * 0.33, 0.95, 5, id)}
  ${piece("babytee", { fill: C.bone, accent: C.blaze, print: "pitch" }, w * 0.18, h * 0.2, 0.5, -14, id)}`);

/* campaign banner (text is overlaid in the UI on the left) */
comp("campaign-wide", 2400, 1100, C.ink, (id, w, h) => `
  ${piece("tote", O.tote, w * 0.9, h * 0.52, 0.95, 8, id)}
  ${piece("hoodie", O.pitchHoodie, w * 0.73, h * 0.52, 1.25, -4, id)}
  ${piece("cap", O.pitchCap, w * 0.59, h * 0.8, 0.8, -10, id)}`);
comp("campaign-tall", 1200, 1500, C.ink, (id, w, h) => `
  ${fitWord("PITCH", w * 0.04, h * 0.97, w * 0.92, 420, "#161616")}
  ${piece("hoodie", O.pitchHoodie, w * 0.52, h * 0.6, 1.25, -4, id)}
  ${piece("cap", O.pitchCap, w * 0.25, h * 0.86, 0.8, -10, id)}`);

/* lookbook outfits */
const outfits = [
  { name: "lookbook-01", bg: "#D9D4CB", top: ["hoodie", O.pitchHoodie], bottom: ["cargo", O.cargo], acc: ["cap", O.pitchCap] },
  { name: "lookbook-02", bg: C.blaze, top: ["vest", O.vest], under: ["tee", O.pitchTee], bottom: ["cargo", { ...O.cargo, fill: C.ink }], acc: ["beanie", O.beanie] },
  { name: "lookbook-03", bg: C.coal, top: ["jacket", O.track], bottom: ["cargo", O.wideCargo], acc: ["cap", O.guyCap] },
];
outfits.forEach((o) =>
  comp(o.name, 1000, 1250, o.bg, (id, w, h) => `
    ${piece(o.bottom[0], o.bottom[1], w * 0.52, h * 0.68, 1.0, 3, id)}
    ${o.under ? piece(o.under[0], o.under[1], w * 0.42, h * 0.34, 0.9, -8, id) : ""}
    ${piece(o.top[0], o.top[1], w * 0.5, h * 0.34, 0.92, -4, id)}
    ${piece(o.acc[0], { ...o.acc[1], fill: o.acc[1].fill === o.bg ? C.ink : o.acc[1].fill }, w * 0.8, h * 0.15, 0.6, 12, id)}`),
);

/* studio flat-lay grid (about) */
comp("about-studio", 1600, 1000, "#ECE9E4", (id, w, h) => `
  ${piece("hoodie", O.guyHoodie, w * 0.2, h * 0.5, 0.82, -6, id)}
  ${piece("tee", O.guyTee, w * 0.43, h * 0.42, 0.62, 5, id)}
  ${piece("hoodie", O.pitchHoodie, w * 0.64, h * 0.52, 0.82, -3, id)}
  ${piece("cap", O.guyCap, w * 0.86, h * 0.28, 0.6, 12, id)}
  ${piece("beanie", O.beanie, w * 0.87, h * 0.72, 0.55, -8, id)}
  ${piece("cap", O.pitchCap, w * 0.42, h * 0.84, 0.5, -14, id)}`);
comp("manifesto", 1600, 900, C.blaze, (id, w, h) => `
  ${piece("hoodie", O.guyHoodie, w * 0.25, h * 0.52, 0.85, -6, id)}
  ${piece("hoodie", O.pitchHoodie, w * 0.5, h * 0.5, 0.85, 2, id)}
  ${piece("tee", O.iconTee, w * 0.75, h * 0.5, 0.8, 7, id)}`);

/* culture covers */
const covers = [
  { name: "culture-heat-layering", bg: "#E9E4DC", items: [["tee", O.guyTee, 0.42, 0.5, 0.75, -6], ["cap", O.guyCap, 0.7, 0.42, 0.6, 10]] },
  { name: "culture-night-market", bg: C.ink, items: [["vest", O.vest, 0.42, 0.52, 0.8, -5], ["beanie", O.beanie, 0.72, 0.5, 0.6, 10]] },
  { name: "culture-inside-drop", bg: C.blaze, items: [["hoodie", O.guyHoodie, 0.38, 0.52, 0.85, -5], ["hoodie", O.pitchHoodie, 0.64, 0.52, 0.85, 5]] },
  { name: "culture-read-a-fit", bg: "#D9D4CB", items: [["cargo", O.wideCargo, 0.62, 0.55, 0.75, 4], ["babytee", { fill: C.ink, accent: C.blaze, print: "blocked-pitch" }, 0.34, 0.45, 0.75, -6]] },
  { name: "culture-sound-block", bg: C.coal, items: [["jacket", O.track, 0.45, 0.52, 0.8, -4], ["cap", O.pitchCap, 0.74, 0.62, 0.55, 12]] },
  { name: "culture-creator-economy", bg: "#E7E4DF", items: [["tee", O.iconTee, 0.4, 0.5, 0.8, -5], ["tote", O.tote, 0.7, 0.52, 0.65, 8]] },
];
covers.forEach((c) =>
  comp(c.name, 1200, 900, c.bg, (id, w, h) => c.items.map(([t, o, x, y, s, r]) => piece(t, o, w * x, h * y, s, r, id)).join("")),
);

/* ================================================================== */
/* CREATORS — clean placeholder portraits (replace with real photos)   */
/* ================================================================== */
const creatorCards = [
  { name: "creator-01", bg: C.blaze, fg: C.ink },
  { name: "creator-02", bg: "#E7E4DF", fg: C.ink },
  { name: "creator-03", bg: C.coal, fg: C.bone },
  { name: "creator-04", bg: C.sand, fg: C.ink },
  { name: "creator-05", bg: C.ink, fg: C.blaze },
  { name: "creator-06", bg: "#D9D4CB", fg: C.ink },
];
creatorCards.forEach((c, i) =>
  comp(`../creators/${c.name}`, 800, 1000, c.bg, (id, w, h) => `
    ${bigWord(String(i + 1).padStart(2, "0"), w / 2, h * 0.62, 520, c.fg, 0.1)}
    <circle cx="${w / 2}" cy="${h * 0.4}" r="120" fill="${c.fg}" opacity="0.9"/>
    <path d="M${w / 2 - 230} ${h} Q${w / 2 - 220} ${h * 0.6} ${w / 2} ${h * 0.6} Q${w / 2 + 220} ${h * 0.6} ${w / 2 + 230} ${h} Z" fill="${c.fg}" opacity="0.9"/>`),
);

console.log(`✓ media generated in ${ROOT}`);

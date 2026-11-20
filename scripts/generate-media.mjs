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

const grainLayer = (id, w, h) =>
  `<rect width="${w}" height="${h}" filter="url(#grain-${id})" style="mix-blend-mode:overlay"/>`;

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
function productShot({ id, garment, fill, accent, print, bg, cropped, wide, variant, label }) {
  const W = 800;
  const H = 1000;
  const sid = `${id}-${variant}`;
  const isDark = bg === C.ink || bg === C.coal;
  const ink = isDark ? C.bone : C.ink;
  const g = GARMENTS[garment]({ fill, accent, print, cropped, wide }, sid);
  let transform = "";
  if (variant === "b") transform = "translate(400 470) scale(1.9) translate(-400 -420)";
  if (variant === "c") transform = "translate(400 500) rotate(-8) scale(0.9) translate(-400 -500)";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  ${defs(sid, { dots: isDark ? "#ffffff" : "#000000" })}
  <rect width="${W}" height="${H}" fill="${bg}"/>
  <rect width="${W}" height="${H}" fill="url(#fade-${sid})" opacity="${isDark ? 0.08 : 0.35}"/>
  ${variant === "c" ? `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#lines-${sid})" opacity="0.05"/>` : ""}
  <ellipse cx="400" cy="900" rx="260" ry="34" fill="#000" opacity="${isDark ? 0.6 : 0.22}" filter="url(#soft-${sid})"/>
  <g transform="${transform}">${g}</g>
  ${grainLayer(sid, W, H)}
  ${stamp(36, 52, "AFROBIAN/HUB", ink, 15)}
  ${stamp(W - 36, 52, variant === "b" ? "DETAIL" : variant === "c" ? "ALT VIEW" : "FRONT", ink, 15, "end")}
  ${stamp(36, H - 36, label, ink, 13)}
  ${stamp(W - 36, H - 36, "TEMP SHOT", ink, 13, "end")}
</svg>`;
}

/* ------------------------------------------------------------------ */
/* figures for editorial collages                                     */
/* ------------------------------------------------------------------ */
function figure({ x = 400, y = 0, s = 1, top = C.ink, bottom = C.coal, skin = C.skinA, shoe = C.bone, accent = C.blaze, hood = true, flip = false }) {
  const t = `translate(${x} ${y}) scale(${flip ? -s : s} ${s}) translate(-400 0)`;
  return `<g transform="${t}">
    ${hood ? `<path d="M326 278 Q312 118 400 100 Q488 118 474 278 Q400 256 326 278 Z" fill="${top}"/>` : `<rect x="380" y="226" width="40" height="50" fill="${skin}"/><ellipse cx="400" cy="186" rx="52" ry="62" fill="${skin}"/><path d="M342 170 Q350 106 400 104 Q454 106 460 170 Q430 140 400 142 Q370 140 342 170Z" fill="${C.ink}"/>`}
    ${hood ? `<ellipse cx="400" cy="200" rx="40" ry="50" fill="${skin}"/><path d="M360 180 Q400 150 440 180 L440 196 Q400 176 360 196 Z" fill="#000" opacity="0.45"/>` : ""}
    <path d="M330 262 Q400 292 470 262 L548 286 Q592 306 602 372 L628 602 Q631 642 614 652 L586 657 Q572 647 570 612 L552 432 L556 652 Q400 672 244 652 L248 432 L230 612 Q228 647 214 657 L186 652 Q169 642 172 602 L198 372 Q208 306 252 286 Z" fill="${top}"/>
    <path d="M330 262 Q400 292 470 262 L548 286 Q592 306 602 372 L628 602 Q631 642 614 652 L586 657 Q572 647 570 612 L552 432 L556 652 Q400 672 244 652 L248 432 L230 612 Q228 647 214 657 L186 652 Q169 642 172 602 L198 372 Q208 306 252 286 Z" fill="#fff" opacity="0.06"/>
    <g transform="translate(400 410)">${blockIcon(accent, 30)}</g>
    <ellipse cx="600" cy="672" rx="17" ry="22" fill="${skin}"/><ellipse cx="200" cy="672" rx="17" ry="22" fill="${skin}"/>
    <path d="M258 640 L542 640 L566 912 L470 918 L410 712 L390 712 L330 918 L234 912 Z" fill="${bottom}"/>
    <path d="M236 560 L236 560" />
    <path d="M222 900 L338 904 Q356 934 336 946 L208 946 Q196 922 222 900 Z" fill="${shoe}"/>
    <path d="M462 904 L578 900 Q604 922 592 946 L464 946 Q444 934 462 904 Z" fill="${shoe}"/>
    <rect x="208" y="938" width="130" height="8" fill="#000" opacity="0.35"/><rect x="464" y="938" width="130" height="8" fill="#000" opacity="0.35"/>
  </g>`;
}

function tape(x, y, w, rot, color = C.blaze, text = "") {
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="${-w / 2}" y="-24" width="${w}" height="48" fill="${color}"/>${
    text ? `<text x="0" y="9" font-family="${MONO}" font-size="20" font-weight="700" letter-spacing="4" fill="${C.ink}" text-anchor="middle">${text}</text>` : ""
  }</g>`;
}

function editorial({ name, w, h, bg, scene }) {
  const id = name.replace(/[^a-z0-9]/gi, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  ${defs(id, { grain: 0.18, dots: scene.dots ?? C.blaze })}
  <rect width="${w}" height="${h}" fill="${bg}"/>
  ${scene.body(id, w, h)}
  ${grainLayer(id, w, h)}
  </svg>`;
  write(`editorial/${name}.svg`, svg);
}

/* ------------------------------------------------------------------ */
/* creator portraits                                                   */
/* ------------------------------------------------------------------ */
function portrait({ name, bg, skin, top, hair, accent, initials }) {
  const W = 800;
  const H = 1000;
  const id = name;
  const hairs = {
    afro: `<circle cx="400" cy="400" r="200" fill="${C.ink}"/><circle cx="400" cy="400" r="200" fill="url(#dots-${id})" opacity="0.18"/>`,
    puffs: `<circle cx="285" cy="280" r="92" fill="${C.ink}"/><circle cx="515" cy="280" r="92" fill="${C.ink}"/>`,
    cap: "",
    hood: `<path d="M240 720 Q200 260 400 220 Q600 260 560 720 Z" fill="${top}"/><path d="M240 720 Q200 260 400 220 Q600 260 560 720 Z" fill="#000" opacity="0.25"/>`,
    wrap: "",
    buzz: "",
    braids: [...Array(9)].map((_, i) => `<rect x="${282 + i * 28}" y="300" width="18" height="${380 + (i % 3) * 30}" rx="9" fill="${C.ink}"/>`).join(""),
  };
  const above = {
    cap: `<path d="M282 410 Q286 270 400 262 Q514 270 518 410 Z" fill="${accent}"/><path d="M276 408 Q400 380 524 408 Q560 430 590 430 Q470 448 276 430 Z" fill="${accent}"/><path d="M276 408 Q400 380 524 408 Q560 430 590 430 Q470 448 276 430 Z" fill="#000" opacity="0.3"/>`,
    wrap: `<path d="M276 420 Q270 250 400 236 Q530 250 524 420 Q470 360 400 362 Q330 360 276 420 Z" fill="${accent}"/><circle cx="452" cy="262" r="46" fill="${accent}"/><path d="M276 420 Q270 250 400 236 Q530 250 524 420 Q470 360 400 362 Q330 360 276 420 Z" fill="url(#lines-${id})" opacity="0.2"/>`,
    buzz: `<path d="M286 420 Q286 290 400 280 Q514 290 514 420 Q470 340 400 336 Q330 340 286 420 Z" fill="${C.ink}"/>`,
    afro: "",
    puffs: `<path d="M286 420 Q286 290 400 280 Q514 290 514 420 Q470 340 400 336 Q330 340 286 420 Z" fill="${C.ink}"/>`,
    hood: "",
    braids: `<path d="M282 430 Q282 285 400 276 Q518 285 518 430 Q470 340 400 336 Q330 340 282 430 Z" fill="${C.ink}"/>`,
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  ${defs(id, { grain: 0.2, dots: C.ink })}
  <rect width="${W}" height="${H}" fill="${bg}"/>
  <text x="${W / 2}" y="${H * 0.58}" font-family="${DISPLAY}" font-size="620" fill="${C.ink}" opacity="0.08" text-anchor="middle">${initials}</text>
  <circle cx="400" cy="430" r="320" fill="url(#dots-${id})" mask="url(#halo-${id})" opacity="0.25"/>
  ${hairs[hair]}
  <path d="M110 1000 Q120 790 290 748 L352 726 L352 640 L448 640 L448 726 L510 748 Q680 790 690 1000 Z" fill="${top}"/>
  <path d="M110 1000 Q120 790 290 748 L352 726 L352 640 L448 640 L448 726 L510 748 Q680 790 690 1000 Z" fill="#fff" opacity="0.07"/>
  <path d="M352 680 L448 680 L448 728 Q400 770 352 728 Z" fill="${skin}"/>
  <ellipse cx="400" cy="470" rx="118" ry="150" fill="${skin}"/>
  <path d="M300 520 Q400 560 500 520 Q490 600 400 620 Q310 600 300 520 Z" fill="#000" opacity="0.12"/>
  ${above[hair]}
  <path d="M355 760 L445 760 L430 830 L370 830 Z" fill="${accent}"/>
  ${grainLayer(id, W, H)}
  ${stamp(36, 52, "AFROBIAN/HUB — CREATORS", C.ink, 14)}
  ${stamp(W - 36, H - 36, "PORTRAIT PLACEHOLDER", bg === C.ink || bg === C.coal ? C.bone : C.ink, 13, "end")}
</svg>`;
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
/* EDITORIAL                                                           */
/* ================================================================== */
editorial({
  name: "hero-main",
  w: 1200,
  h: 1500,
  bg: C.ink,
  scene: {
    body: (id, w, h) => `
      <circle cx="${w * 0.55}" cy="${h * 0.38}" r="420" fill="${C.blaze}"/>
      <circle cx="${w * 0.55}" cy="${h * 0.38}" r="520" fill="url(#dots-${id})" mask="url(#halo-${id})" opacity="0.7"/>
      <rect x="0" y="${h * 0.62}" width="${w}" height="${h * 0.38}" fill="${C.coal}"/>
      <rect x="0" y="${h * 0.62}" width="${w}" height="${h * 0.38}" fill="url(#lines-${id})" opacity="0.06"/>
      <ellipse cx="${w * 0.5}" cy="${h * 0.93}" rx="360" ry="40" fill="#000" opacity="0.7" filter="url(#soft-${id})"/>
      ${figure({ x: w * 0.5, y: h * 0.03, s: 1.48, top: C.ink, bottom: "#1a1a1a", skin: C.skinA, shoe: C.bone })}
      ${tape(w * 0.18, h * 0.16, 420, -8, C.bone, "DROP 01 — BLOOCK THAT GUYYY")}
      ${tape(w * 0.86, h * 0.78, 360, 6, C.blaze, "MA → WORLD")}
    `,
  },
});

editorial({
  name: "hero-side",
  w: 900,
  h: 1100,
  bg: C.bone,
  scene: {
    dots: C.ink,
    body: (id, w, h) => `
      <rect x="${w * 0.08}" y="${h * 0.06}" width="${w * 0.84}" height="${h * 0.7}" fill="${C.blaze}"/>
      <rect x="${w * 0.08}" y="${h * 0.06}" width="${w * 0.84}" height="${h * 0.7}" fill="url(#dots-${id})" opacity="0.18"/>
      ${figure({ x: w * 0.36, y: h * 0.1, s: 0.96, top: C.bone, bottom: C.olive, skin: C.skinB, shoe: C.ink, accent: C.ink, hood: false })}
      ${figure({ x: w * 0.68, y: h * 0.16, s: 0.88, top: C.ink, bottom: C.sand, skin: C.skinC, shoe: C.bone, flip: true })}
      <text x="${w * 0.08}" y="${h * 0.92}" font-family="${DISPLAY}" font-size="120" fill="${C.ink}">STREET/</text>
      ${stamp(w * 0.08, h * 0.97, "LOOKBOOK FRAME 02 — TEMPORARY ARTWORK", C.ink, 18)}
    `,
  },
});

const lookbooks = [
  { name: "lookbook-01", bg: C.coal, sun: C.blaze, figs: [{ top: C.blaze, bottom: C.ink, skin: C.skinA, shoe: C.bone, accent: C.ink }], word: "BLOOCK" },
  { name: "lookbook-02", bg: C.blaze, sun: C.ink, figs: [{ top: C.ink, bottom: C.coal, skin: C.skinB, shoe: C.blaze, hood: false }], word: "GUYYY" },
  { name: "lookbook-03", bg: C.bone, sun: C.blaze, figs: [{ top: C.coal, bottom: C.sand, skin: C.skinC, shoe: C.ink }, { top: C.ink, bottom: C.olive, skin: C.skinA, shoe: C.bone, hood: false }], word: "PITCH" },
  { name: "lookbook-04", bg: C.ink, sun: C.coal, figs: [{ top: C.bone, bottom: C.ink, skin: C.skinB, shoe: C.blaze, accent: C.blaze, hood: false }], word: "AFTER DARK" },
];
lookbooks.forEach((lb) => {
  editorial({
    name: lb.name,
    w: 1000,
    h: 1250,
    bg: lb.bg,
    scene: {
      dots: lb.bg === C.bone ? C.ink : C.bone,
      body: (id, w, h) => {
        const n = lb.figs.length;
        const figs = lb.figs
          .map((f, i) => figure({ ...f, x: n === 1 ? w / 2 : w * (0.32 + i * 0.36), y: n === 1 ? h * 0.08 : h * 0.16 + i * 20, s: n === 1 ? 1.2 : 0.98, flip: i === 1 }))
          .join("");
        const textColor = lb.bg === C.bone ? C.ink : lb.bg === C.blaze ? C.ink : C.bone;
        return `
        <circle cx="${w * 0.7}" cy="${h * 0.3}" r="300" fill="${lb.sun}"/>
        <rect width="${w}" height="${h}" fill="url(#dots-${id})" opacity="0.07"/>
        <text x="-20" y="${h * 0.5}" font-family="${DISPLAY}" font-size="300" fill="none" stroke="${textColor}" stroke-width="3" opacity="0.5">${lb.word}</text>
        ${figs}
        ${stamp(40, h - 40, `${lb.name.toUpperCase()} / TEMPORARY ARTWORK`, textColor, 18)}`;
      },
    },
  });
});

editorial({
  name: "panel-men",
  w: 1000,
  h: 1400,
  bg: C.coal,
  scene: {
    dots: C.bone,
    body: (id, w, h) => `
      <rect x="0" y="${h * 0.55}" width="${w}" height="${h * 0.45}" fill="${C.ink}"/>
      <rect x="${w * 0.6}" y="0" width="${w * 0.4}" height="${h}" fill="${C.blaze}"/>
      <rect width="${w}" height="${h}" fill="url(#lines-${id})" opacity="0.05"/>
      ${figure({ x: w * 0.5, y: h * 0.12, s: 1.3, top: C.ink, bottom: C.olive, skin: C.skinA, shoe: C.bone })}
      ${stamp(40, h - 40, "MEN — TEMPORARY ARTWORK", C.bone, 18)}`,
  },
});

editorial({
  name: "panel-women",
  w: 1000,
  h: 1400,
  bg: C.bone,
  scene: {
    dots: C.ink,
    body: (id, w, h) => `
      <circle cx="${w * 0.5}" cy="${h * 0.36}" r="380" fill="${C.blaze}"/>
      <circle cx="${w * 0.5}" cy="${h * 0.36}" r="460" fill="url(#dots-${id})" mask="url(#halo-${id})" opacity="0.35"/>
      <rect x="0" y="${h * 0.72}" width="${w}" height="${h * 0.28}" fill="${C.sand}"/>
      ${figure({ x: w * 0.5, y: h * 0.12, s: 1.3, top: C.ink, bottom: C.sand, skin: C.skinC, shoe: C.blaze, hood: false, accent: C.blaze })}
      ${stamp(40, h - 40, "WOMEN — TEMPORARY ARTWORK", C.ink, 18)}`,
  },
});

editorial({
  name: "manifesto",
  w: 1600,
  h: 1000,
  bg: C.blaze,
  scene: {
    dots: C.ink,
    body: (id, w, h) => `
      <rect width="${w}" height="${h}" fill="url(#dots-${id})" opacity="0.12"/>
      ${figure({ x: w * 0.22, y: h * 0.05, s: 0.92, top: C.ink, bottom: C.coal, skin: C.skinA, shoe: C.bone })}
      ${figure({ x: w * 0.5, y: h * 0.0, s: 0.98, top: C.bone, bottom: C.ink, skin: C.skinB, shoe: C.ink, hood: false, accent: C.ink })}
      ${figure({ x: w * 0.78, y: h * 0.05, s: 0.92, top: C.coal, bottom: C.sand, skin: C.skinC, shoe: C.blaze, flip: true })}
      ${stamp(40, h - 36, "CREW SHOT — TEMPORARY ARTWORK", C.ink, 18)}`,
  },
});

editorial({
  name: "about-studio",
  w: 1400,
  h: 1000,
  bg: C.ink,
  scene: {
    dots: C.blaze,
    body: (id, w, h) => `
      <rect x="${w * 0.05}" y="${h * 0.1}" width="${w * 0.35}" height="${h * 0.5}" fill="${C.coal}"/>
      <rect x="${w * 0.45}" y="${h * 0.18}" width="${w * 0.22}" height="${h * 0.62}" fill="${C.bone}"/>
      <rect x="${w * 0.72}" y="${h * 0.08}" width="${w * 0.23}" height="${h * 0.4}" fill="${C.blaze}"/>
      <rect x="${w * 0.05}" y="${h * 0.66}" width="${w * 0.35}" height="${h * 0.24}" fill="url(#dots-${id})"/>
      <g transform="translate(${w * 0.45} ${h * 0.18}) scale(0.5)">${GARMENTS.hoodie({ fill: C.ink, accent: C.blaze, print: "guy" }, id)}</g>
      <g transform="translate(${w * 0.72} ${h * 0.06}) scale(0.4)">${GARMENTS.tee({ fill: C.bone, accent: C.ink, print: "block" }, id)}</g>
      ${figure({ x: w * 0.22, y: h * 0.12, s: 0.72, top: C.blaze, bottom: C.ink, skin: C.skinB, shoe: C.bone, accent: C.ink, hood: false })}
      <text x="${w * 0.72}" y="${h * 0.66}" font-family="${DISPLAY}" font-size="120" fill="${C.bone}">MADE</text>
      <text x="${w * 0.72}" y="${h * 0.8}" font-family="${DISPLAY}" font-size="120" fill="${C.blaze}">LOUD.</text>
      ${stamp(40, h - 36, "STUDIO — TEMPORARY ARTWORK", C.bone, 18)}`,
  },
});

/* culture covers */
const covers = [
  { name: "culture-heat-layering", bg: C.blaze, word: "38°C", fig: { top: C.bone, bottom: C.ink, skin: C.skinB, shoe: C.ink, hood: false, accent: C.ink } },
  { name: "culture-night-market", bg: C.ink, word: "NIGHT", fig: { top: C.blaze, bottom: C.coal, skin: C.skinA, shoe: C.bone, accent: C.ink } },
  { name: "culture-inside-drop", bg: C.bone, word: "DROP 01", fig: { top: C.ink, bottom: C.olive, skin: C.skinC, shoe: C.blaze } },
  { name: "culture-read-a-fit", bg: C.coal, word: "FIT CHECK", fig: { top: C.sand, bottom: C.ink, skin: C.skinB, shoe: C.bone, hood: false, accent: C.blaze } },
  { name: "culture-sound-block", bg: C.sky, word: "BPM", fig: { top: C.ink, bottom: C.ink, skin: C.skinA, shoe: C.blaze } },
  { name: "culture-creator-economy", bg: C.sand, word: "CREATE", fig: { top: C.blaze, bottom: C.coal, skin: C.skinC, shoe: C.ink, hood: false, accent: C.ink } },
];
covers.forEach((c) => {
  editorial({
    name: c.name,
    w: 1200,
    h: 900,
    bg: c.bg,
    scene: {
      dots: c.bg === C.ink || c.bg === C.coal ? C.bone : C.ink,
      body: (id, w, h) => {
        const tc = c.bg === C.ink || c.bg === C.coal ? C.bone : C.ink;
        return `
        <text x="${w / 2}" y="${h * 0.62}" font-family="${DISPLAY}" font-size="330" fill="${tc}" opacity="0.14" text-anchor="middle">${c.word}</text>
        <circle cx="${w * 0.78}" cy="${h * 0.3}" r="150" fill="url(#dots-${id})" opacity="0.4"/>
        ${figure({ ...c.fig, x: w * 0.42, y: h * 0.04, s: 0.88 })}
        ${tape(w * 0.78, h * 0.82, 330, -5, c.bg === C.blaze ? C.ink : C.blaze, "")}
        ${stamp(36, h - 30, "CULTURE — TEMPORARY ARTWORK", tc, 16)}`;
      },
    },
  });
});

/* ================================================================== */
/* CREATORS                                                            */
/* ================================================================== */
const creators = [
  { name: "creator-01", bg: C.blaze, skin: C.skinA, top: C.ink, hair: "afro", accent: C.bone, initials: "01" },
  { name: "creator-02", bg: C.bone, skin: C.skinC, top: C.blaze, hair: "wrap", accent: C.ink, initials: "02" },
  { name: "creator-03", bg: C.coal, skin: C.skinB, top: C.bone, hair: "cap", accent: C.blaze, initials: "03" },
  { name: "creator-04", bg: C.sand, skin: C.skinA, top: C.ink, hair: "braids", accent: C.blaze, initials: "04" },
  { name: "creator-05", bg: C.sky, skin: C.skinB, top: C.coal, hair: "hood", accent: C.blaze, initials: "05" },
  { name: "creator-06", bg: C.bone, skin: C.skinC, top: C.ink, hair: "puffs", accent: C.blaze, initials: "06" },
];
creators.forEach((c) => write(`creators/${c.name}.svg`, portrait(c)));

console.log(`✓ media generated in ${ROOT}`);

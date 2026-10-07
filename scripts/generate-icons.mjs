// Builds the app icons in public/icons/ from public/favicon.svg, for installing
// the app (PWA) on a phone or desktop:
//
//   icon-192.png, icon-512.png  the rounded mark, as Android and desktop show it
//   maskable-512.png            full-bleed, mark kept inside the safe zone, so
//                               Android can crop it to its own shape
//   apple-touch-icon.png        180px full-bleed — iOS rounds the corners itself
//
// Run with `npm run generate-icons` after changing favicon.svg; the PNGs are committed.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const favicon = readFileSync('public/favicon.svg', 'utf8');
const defs = favicon.match(/<defs>[\s\S]*<\/defs>/)[0];
// The letter and the dot — everything after the background square.
const mark = favicon.slice(favicon.indexOf('<text'), favicon.lastIndexOf('</svg>'));

/** The mark on a full square, scaled about its centre (it sits slightly right of and below the middle). */
const fullBleed = (scale) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  ${defs}
  <rect width="64" height="64" fill="url(#bg)"/>
  <g transform="translate(32 32) scale(${scale}) translate(-34 -33)">${mark}</g>
</svg>`;

const render = (svg, size) =>
  new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
    font: { loadSystemFonts: true, defaultFontFamily: 'Georgia' },
  })
    .render()
    .asPng();

mkdirSync('public/icons', { recursive: true });
const icons = {
  'icon-192.png': render(favicon, 192),
  'icon-512.png': render(favicon, 512),
  'maskable-512.png': render(fullBleed(0.72), 512),
  'apple-touch-icon.png': render(fullBleed(0.9), 180),
};
for (const [name, png] of Object.entries(icons)) {
  writeFileSync(`public/icons/${name}`, png);
  console.log(`public/icons/${name}  ${(png.length / 1024).toFixed(1)} KB`);
}

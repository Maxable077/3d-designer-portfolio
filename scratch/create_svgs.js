const fs = require('fs');

function createSVG(text, fontFamily, fontWeight, extraAttrs = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" width="100%" height="100%">
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="${fontFamily}" font-weight="${fontWeight}" font-size="34" fill="currentColor" ${extraAttrs}>${text}</text>
</svg>`;
}

const logos = [
  { domain: 'openai.com', text: 'OpenAI', font: 'system-ui, -apple-system, sans-serif', weight: '600', extra: 'letter-spacing="-1"' },
  { domain: 'anthropic.com', text: 'ANTHROPIC', font: 'Georgia, serif', weight: '400', extra: 'letter-spacing="3"' },
  { domain: 'midjourney.com', text: 'Midjourney', font: 'Courier New, monospace', weight: '400', extra: '' },
  { domain: 'stability.ai', text: 'Stability.ai', font: 'system-ui, sans-serif', weight: '500', extra: '' },
  { domain: 'blender.org', text: 'blender', font: 'Arial, sans-serif', weight: '800', extra: 'letter-spacing="-1"' },
  { domain: 'autodesk.com', text: 'AUTODESK', font: 'system-ui, sans-serif', weight: '700', extra: 'letter-spacing="2"' },
  { domain: 'chaos.com', text: 'V-Ray', font: 'system-ui, sans-serif', weight: '800', extra: 'font-style="italic"' },
  { domain: 'adobe.com', text: 'Adobe Substance 3D', font: 'system-ui, sans-serif', weight: '600', extra: '' },
  { domain: 'marmoset.co', text: 'Marmoset', font: 'system-ui, sans-serif', weight: '800', extra: 'letter-spacing="1"' },
  { domain: 'rizom-lab.com', text: 'RizomUV', font: 'system-ui, sans-serif', weight: '700', extra: '' }
];

logos.forEach(l => {
  fs.writeFileSync(`public/tech/${l.domain}.svg`, createSVG(l.text, l.font, l.weight, l.extra));
});

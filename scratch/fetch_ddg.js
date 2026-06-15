const { image_search } = require('duckduckgo-images-api');
const fs = require('fs');
const https = require('https');
const http = require('http');

const logos = [
  { domain: 'openai.com', query: 'OpenAI logo wordmark svg' },
  { domain: 'anthropic.com', query: 'Anthropic logo wordmark svg' },
  { domain: 'midjourney.com', query: 'Midjourney logo text wordmark svg' },
  { domain: 'stability.ai', query: 'Stability AI logo wordmark svg' },
  { domain: 'blender.org', query: 'Blender logo wordmark svg' },
  { domain: 'autodesk.com', query: 'Autodesk logo wordmark svg' },
  { domain: 'chaos.com', query: 'V-Ray logo wordmark svg' },
  { domain: 'adobe.com', query: 'Adobe Substance 3D logo svg' },
  { domain: 'marmoset.co', query: 'Marmoset Toolbag logo wordmark svg' },
  { domain: 'rizom-lab.com', query: 'RizomUV logo wordmark svg' }
];

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

async function run() {
  for (const l of logos) {
    try {
      console.log(`Searching for ${l.query}...`);
      const results = await image_search({ query: l.query, moderate: true });
      const svgRes = results.find(r => r.image.toLowerCase().endsWith('.svg') && !r.image.includes('icon'));
      
      if (svgRes) {
        console.log(`Found SVG: ${svgRes.image}`);
        await download(svgRes.image, `../public/tech/${l.domain}.svg`);
      } else {
        console.log(`No SVG found for ${l.query}`);
      }
    } catch (e) {
      console.error(`Error for ${l.domain}:`, e.message);
    }
  }
}

run();

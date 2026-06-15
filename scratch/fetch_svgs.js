const fs = require('fs');
const https = require('https');

const brands = [
  { name: 'OpenAI', query: 'OpenAI' },
  { name: 'Anthropic', query: 'Anthropic' },
  { name: 'Midjourney', query: 'Midjourney' },
  { name: 'Stable Diffusion', query: 'Stable Diffusion' },
  { name: 'Blender', query: 'Blender (software)' },
  { name: 'Autodesk', query: 'Autodesk' },
  { name: 'Chaos', query: 'Chaos (company)' },
  { name: 'Adobe', query: 'Adobe Inc.' },
  { name: 'Marmoset', query: 'Marmoset (software)' },
  { name: 'RizomUV', query: 'Rizom-Lab' }
];

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'AntigravityAgent/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

async function run() {
  for (const brand of brands) {
    try {
      console.log(`Searching for ${brand.name}...`);
      // Search Wikipedia for the page
      const searchRes = await fetchJson(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(brand.query)}&utf8=&format=json`);
      if (!searchRes.query.search.length) { console.log(`Not found: ${brand.name}`); continue; }
      
      const title = searchRes.query.search[0].title;
      
      // Get page images
      const imgRes = await fetchJson(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=images&format=json`);
      const pages = imgRes.query.pages;
      const pageId = Object.keys(pages)[0];
      const images = pages[pageId].images;
      
      if (!images) { console.log(`No images for ${brand.name}`); continue; }
      
      // Find SVG logo
      let svgImage = images.find(img => img.title.toLowerCase().includes('logo') && img.title.toLowerCase().endsWith('.svg'));
      if (!svgImage) {
        svgImage = images.find(img => img.title.toLowerCase().endsWith('.svg') && !img.title.toLowerCase().includes('icon'));
      }
      
      if (!svgImage) { console.log(`No SVG logo for ${brand.name}`); continue; }
      
      // Get image URL
      const fileRes = await fetchJson(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(svgImage.title)}&prop=imageinfo&iiprop=url&format=json`);
      const filePages = fileRes.query.pages;
      const filePageId = Object.keys(filePages)[0];
      const url = filePages[filePageId].imageinfo[0].url;
      
      console.log(`Downloading ${url} to public/tech/${brand.name}.svg`);
      await download(url, `public/tech/${brand.name}.svg`);
    } catch (e) {
      console.error(`Error processing ${brand.name}:`, e.message);
    }
  }
}

run();

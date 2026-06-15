const si = require('simple-icons');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../public/tech');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const techs = {
  'OpenAI': 'openai',
  'Anthropic / Claude': 'anthropic',
  'Midjourney': 'midjourney',
  'Stable Diffusion': 'stablediffusion',
  'Blender': 'blender',
  'Autodesk Fusion': 'autodesk',
  'Chaos V-Ray': 'chaos',
  'Adobe Substance 3D': 'adobe',
  'Marmoset Toolbag': 'marmoset',
  'RizomUV': 'rizomuv'
};

for (const [name, slug] of Object.entries(techs)) {
  const icon = si.Get(slug);
  if (icon) {
    console.log(`Found ${name} (${slug})`);
    fs.writeFileSync(path.join(targetDir, `${slug}.svg`), icon.svg);
  } else {
    console.log(`NOT FOUND: ${name} (${slug})`);
  }
}

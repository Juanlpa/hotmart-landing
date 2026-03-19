import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUT_DIR = path.join(process.cwd(), 'ads-campaign');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Helper to wrap SVG in generic boilerplate
const wrapSvg = (width, height, content) => `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      text { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
      .title { font-weight: 900; font-size: ${width === 1080 && height === 1920 ? '72px' : '56px'}; fill: #FFFFFF; }
      .highlight { font-weight: 900; font-size: ${width === 1080 && height === 1920 ? '80px' : '64px'}; fill: #833cf6; }
      .body { font-weight: 500; font-size: ${width === 1080 && height === 1920 ? '40px' : '32px'}; fill: #FFFFFF; }
      .check { fill: #22C55E; font-weight: bold; }
      .badge-text { font-weight: 900; font-size: ${width === 1080 && height === 1920 ? '42px' : '36px'}; fill: #FFFFFF; text-anchor: middle; }
      .badge-sub { font-weight: 600; font-size: ${width === 1080 && height === 1920 ? '28px' : '20px'}; fill: #FFFFFF; text-anchor: middle; }
      .footer { font-weight: 500; font-size: ${width === 1080 && height === 1920 ? '30px' : '24px'}; fill: #9CA3AF; }
      .discount { font-weight: 800; font-size: ${width === 1080 && height === 1920 ? '32px' : '26px'}; fill: #833cf6; }
    </style>
  </defs>
  <rect width="${width}" height="${height}" fill="#0a0a0a"/>
  ${content}
</svg>
`;

const configs = [
  {
    name: 'tvt-dolor-feed-1080x1080',
    width: 1080,
    height: 1080,
    content: `
      <!-- Hook -->
      <text x="100" y="240" class="title">Llevas AÑOS</text>
      <text x="100" y="320" class="title">haciendo dietas...</text>
      <text x="100" y="420" class="highlight">...y sigues igual?</text>
      
      <!-- Divider -->
      <rect x="100" y="480" width="880" height="4" fill="#833cf6" opacity="0.4"/>
      
      <!-- Subtext -->
      <text x="100" y="580" class="body">El problema no eres tú.</text>
      <text x="100" y="640" class="body">Es el método.</text>
      
      <!-- Badge -->
      <rect x="100" y="740" width="450" height="120" rx="16" fill="#22C55E"/>
      <text x="325" y="800" class="badge-text" >MÉTODO TVT</text>
      <text x="325" y="840" class="badge-sub" >$30 USD</text>
      
      <!-- Guarantee -->
      <text x="100" y="940" class="footer">✓ Garantía de 7 días</text>
    `
  },
  {
    name: 'tvt-dolor-story-1080x1920',
    width: 1080,
    height: 1920,
    content: `
      <!-- Center vertical shift -->
      <g transform="translate(0, 450)">
        <text x="100" y="0" class="title">Llevas AÑOS</text>
        <text x="100" y="100" class="title">haciendo dietas...</text>
        <text x="100" y="220" class="highlight">...y sigues</text>
        <text x="100" y="320" class="highlight">igual?</text>
        
        <rect x="100" y="400" width="880" height="6" fill="#833cf6" opacity="0.4"/>
        
        <text x="100" y="520" class="body">El problema no eres tú.</text>
        <text x="100" y="580" class="body">Es el método.</text>
      </g>
      
      <!-- Badge lower third -->
      <g transform="translate(0, 1300)">
        <rect x="100" y="0" width="550" height="160" rx="20" fill="#22C55E"/>
        <text x="375" y="80" class="badge-text">MÉTODO TVT</text>
        <text x="375" y="130" class="badge-sub">$30 USD</text>
        
        <text x="100" y="260" class="footer">✓ Garantía de 7 días</text>
      </g>
    `
  },
  {
    name: 'tvt-transformacion-feed-1080x1080',
    width: 1080,
    height: 1080,
    content: `
      <!-- Hook -->
      <text x="100" y="200" class="title">500+ mujeres ya</text>
      <text x="100" y="280" class="title">se transformaron</text>
      <text x="100" y="380" class="highlight">en solo 30 días</text>
      
      <!-- Divider -->
      <rect x="100" y="450" width="880" height="4" fill="#833cf6" opacity="0.4"/>
      
      <!-- Benefits -->
      <text x="100" y="550" class="body"><tspan class="check">✓</tspan> Plan de alimentación</text>
      <text x="100" y="610" class="body"><tspan class="check">✓</tspan> Rutinas guiadas</text>
      <text x="100" y="670" class="body"><tspan class="check">✓</tspan> Comunidad de apoyo</text>
      
      <!-- Badge -->
      <rect x="100" y="750" width="450" height="120" rx="16" fill="#22C55E"/>
      <text x="325" y="810" class="badge-text" >$30 USD</text>
      <text x="325" y="850" class="badge-sub" >Acceso inmediato</text>
      
      <!-- Promo text -->
      <text x="100" y="950" class="discount">93% de descuento | Garantía 7 días</text>
    `
  },
  {
    name: 'tvt-transformacion-story-1080x1920',
    width: 1080,
    height: 1920,
    content: `
      <!-- Center vertical shift -->
      <g transform="translate(0, 450)">
        <text x="100" y="0" class="title">500+ mujeres ya</text>
        <text x="100" y="100" class="title">se transformaron</text>
        <text x="100" y="230" class="highlight">en solo</text>
        <text x="100" y="330" class="highlight">30 días</text>
        
        <rect x="100" y="420" width="880" height="6" fill="#833cf6" opacity="0.4"/>
        
        <text x="100" y="550" class="body"><tspan class="check">✓</tspan> Plan de alimentación</text>
        <text x="100" y="630" class="body"><tspan class="check">✓</tspan> Rutinas guiadas</text>
        <text x="100" y="710" class="body"><tspan class="check">✓</tspan> Comunidad de apoyo</text>
      </g>
      
      <!-- Badge lower third -->
      <g transform="translate(0, 1400)">
        <rect x="100" y="0" width="550" height="160" rx="20" fill="#22C55E"/>
        <text x="375" y="80" class="badge-text">$30 USD</text>
        <text x="375" y="130" class="badge-sub">Acceso inmediato</text>
        
        <text x="100" y="250" class="discount">93% de descuento | Garantía 7 días</text>
      </g>
    `
  }
];

async function generate() {
  for (const config of configs) {
    const svgStr = wrapSvg(config.width, config.height, config.content);
    const outFile = path.join(OUT_DIR, `${config.name}.png`);
    
    // Convert SVG to PNG
    try {
      await sharp(Buffer.from(svgStr))
        .png()
        .toFile(outFile);
      console.log(`✅ Generated ${outFile}`);
    } catch (err) {
      console.error(`❌ Failed to generate ${config.name}:`, err);
    }
  }
}

generate();

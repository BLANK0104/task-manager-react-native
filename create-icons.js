const fs = require('fs');
const path = require('path');
// Simple SVG icon for TaskFlow - a checkmark with list lines
const createIconSVG = (size, bgColor = '#6C63FF', fgColor = '#FFFFFF') => {
  const padding = size * 0.15;
  const innerSize = size - (padding * 2);
  const strokeWidth = size * 0.08;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${bgColor}"/>
  <!-- Checklist lines -->
  <rect x="${padding + innerSize * 0.35}" y="${padding + innerSize * 0.15}" 
        width="${innerSize * 0.55}" height="${strokeWidth * 0.8}" 
        rx="${strokeWidth * 0.4}" fill="${fgColor}" opacity="0.9"/>
  <rect x="${padding + innerSize * 0.35}" y="${padding + innerSize * 0.45}" 
        width="${innerSize * 0.45}" height="${strokeWidth * 0.8}" 
        rx="${strokeWidth * 0.4}" fill="${fgColor}" opacity="0.9"/>
  <rect x="${padding + innerSize * 0.35}" y="${padding + innerSize * 0.75}" 
        width="${innerSize * 0.5}" height="${strokeWidth * 0.8}" 
        rx="${strokeWidth * 0.4}" fill="${fgColor}" opacity="0.9"/>
  <!-- Checkmark -->
  <g transform="translate(${padding + innerSize * 0.05}, ${padding + innerSize * 0.05})">
    <circle cx="${innerSize * 0.12}" cy="${innerSize * 0.12}" r="${innerSize * 0.12}" 
            fill="${fgColor}" opacity="0.2"/>
    <path d="M ${innerSize * 0.06} ${innerSize * 0.12} 
             L ${innerSize * 0.11} ${innerSize * 0.17} 
             L ${innerSize * 0.19} ${innerSize * 0.07}" 
          stroke="${bgColor}" stroke-width="${strokeWidth * 0.7}" 
          stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </g>
  <!-- Second checkmark -->
  <g transform="translate(${padding + innerSize * 0.05}, ${padding + innerSize * 0.35})">
    <circle cx="${innerSize * 0.12}" cy="${innerSize * 0.12}" r="${innerSize * 0.12}" 
            fill="${fgColor}"/>
    <path d="M ${innerSize * 0.06} ${innerSize * 0.12} 
             L ${innerSize * 0.11} ${innerSize * 0.17} 
             L ${innerSize * 0.19} ${innerSize * 0.07}" 
          stroke="${bgColor}" stroke-width="${strokeWidth * 0.7}" 
          stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </g>
  <!-- Third checkbox (empty) -->
  <g transform="translate(${padding + innerSize * 0.05}, ${padding + innerSize * 0.65})">
    <circle cx="${innerSize * 0.12}" cy="${innerSize * 0.12}" r="${innerSize * 0.12}" 
            fill="none" stroke="${fgColor}" stroke-width="${strokeWidth * 0.6}"/>
  </g>
</svg>`;
};
// Icon sizes for different densities
const iconSizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192
};
console.log('Creating TaskFlow app icons...\n');
// Create icons for each density
Object.entries(iconSizes).forEach(([folder, size]) => {
  const dir = path.join(__dirname, 'android', 'app', 'src', 'main', 'res', folder);
  // Create launcher icon
  const iconPath = path.join(dir, 'ic_launcher.png');
  const roundIconPath = path.join(dir, 'ic_launcher_round.png');
  // For now, create SVG files that can be converted
  const svgContent = createIconSVG(size);
  const svgPath = path.join(dir, 'ic_launcher.svg');
  fs.writeFileSync(svgPath, svgContent);
  console.log(`? Created ${folder}/ic_launcher.svg (${size}x${size}px)`);
});
console.log('\n? Icon SVG files created successfully!');
console.log('\nNote: SVG files have been created. To convert them to PNG:');
console.log('1. Install sharp: npm install sharp');
console.log('2. Run the PNG conversion script');

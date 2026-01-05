const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Create SVG for TaskFlow icon
const createIconSVG = (size) => {
  const padding = size * 0.15;
  const innerSize = size - (padding * 2);
  const strokeWidth = Math.max(size * 0.08, 2);
  const bgColor = '#6C63FF'; // Purple theme
  const fgColor = '#FFFFFF';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background with rounded corners -->
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${bgColor}"/>

  <!-- Task list lines -->
  <rect x="${padding + innerSize * 0.35}" y="${padding + innerSize * 0.18}"
        width="${innerSize * 0.55}" height="${strokeWidth}"
        rx="${strokeWidth * 0.5}" fill="${fgColor}" opacity="0.95"/>

  <rect x="${padding + innerSize * 0.35}" y="${padding + innerSize * 0.46}"
        width="${innerSize * 0.48}" height="${strokeWidth}"
        rx="${strokeWidth * 0.5}" fill="${fgColor}" opacity="0.95"/>

  <rect x="${padding + innerSize * 0.35}" y="${padding + innerSize * 0.74}"
        width="${innerSize * 0.52}" height="${strokeWidth}"
        rx="${strokeWidth * 0.5}" fill="${fgColor}" opacity="0.95"/>

  <!-- First checkbox (checked with light background) -->
  <g transform="translate(${padding + innerSize * 0.05}, ${padding + innerSize * 0.08})">
    <circle cx="${innerSize * 0.12}" cy="${innerSize * 0.12}" r="${innerSize * 0.13}"
            fill="${fgColor}" opacity="0.25"/>
    <path d="M ${innerSize * 0.06} ${innerSize * 0.12}
             L ${innerSize * 0.105} ${innerSize * 0.175}
             L ${innerSize * 0.19} ${innerSize * 0.065}"
          stroke="${fgColor}" stroke-width="${strokeWidth * 0.9}"
          stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </g>

  <!-- Second checkbox (checked) -->
  <g transform="translate(${padding + innerSize * 0.05}, ${padding + innerSize * 0.36})">
    <circle cx="${innerSize * 0.12}" cy="${innerSize * 0.12}" r="${innerSize * 0.13}"
            fill="${fgColor}"/>
    <path d="M ${innerSize * 0.06} ${innerSize * 0.12}
             L ${innerSize * 0.105} ${innerSize * 0.175}
             L ${innerSize * 0.19} ${innerSize * 0.065}"
          stroke="${bgColor}" stroke-width="${strokeWidth * 0.9}"
          stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </g>

  <!-- Third checkbox (unchecked) -->
  <g transform="translate(${padding + innerSize * 0.05}, ${padding + innerSize * 0.64})">
    <circle cx="${innerSize * 0.12}" cy="${innerSize * 0.12}" r="${innerSize * 0.13}"
            fill="none" stroke="${fgColor}" stroke-width="${strokeWidth * 0.75}"/>
  </g>
</svg>`;
};

// Icon sizes for different Android densities
const iconSizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192
};

console.log('🎨 Creating TaskFlow app icons...\n');

// Generate icons for all densities
const generateIcons = async () => {
  for (const [folder, size] of Object.entries(iconSizes)) {
    const dir = path.join(__dirname, 'android', 'app', 'src', 'main', 'res', folder);

    // Ensure directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const svgContent = createIconSVG(size);
    const svgBuffer = Buffer.from(svgContent);

    // Create standard launcher icon
    const iconPath = path.join(dir, 'ic_launcher.png');
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(iconPath);

    console.log(`✓ Created ${folder}/ic_launcher.png (${size}x${size}px)`);

    // Create round launcher icon (same design)
    const roundIconPath = path.join(dir, 'ic_launcher_round.png');
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(roundIconPath);

    console.log(`✓ Created ${folder}/ic_launcher_round.png (${size}x${size}px)`);
  }

  console.log('\n✅ All icons created successfully!');
  console.log('📱 Your app now has a custom TaskFlow icon with a purple theme.');
  console.log('\n💡 The icon features:');
  console.log('   • Purple background matching your app theme (#6C63FF)');
  console.log('   • Checklist design with checkmarks');
  console.log('   • Professional, modern look');
  console.log('   • All Android densities covered (mdpi to xxxhdpi)');
};

// Run the generation
generateIcons().catch(err => {
  console.error('❌ Error creating icons:', err);
  process.exit(1);
});


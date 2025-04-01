const fs = require('fs');
const path = require('path');

// Create a simple SVG favicon
const svgContent = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="256" fill="#1DB954"/>
  <path d="M256 128C179.307 128 128 179.307 128 256C128 332.693 179.307 384 256 384C332.693 384 384 332.693 384 256C384 179.307 332.693 128 256 128ZM256 352C197.867 352 160 314.133 160 256C160 197.867 197.867 160 256 160C314.133 160 352 197.867 352 256C352 314.133 314.133 352 256 352Z" fill="white"/>
  <path d="M256 192C220.653 192 192 220.653 192 256C192 291.347 220.653 320 256 320C291.347 320 320 291.347 320 256C320 220.653 291.347 192 256 192ZM256 288C238.327 288 224 273.673 224 256C224 238.327 238.327 224 256 224C273.673 224 288 238.327 288 256C288 273.673 273.673 288 256 288Z" fill="white"/>
</svg>
`;

// Create the public directory if it doesn't exist
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Save the SVG file
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);

console.log('Favicon SVG generated successfully!'); 
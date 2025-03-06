import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// After build, modify the index.html in the dist folder
const indexPath = path.resolve(__dirname, 'dist', 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Replace absolute paths with relative paths
indexContent = indexContent.replace(/src="\//g, 'src="./');
indexContent = indexContent.replace(/href="\//g, 'href="./');

// Write the modified content back
fs.writeFileSync(indexPath, indexContent);

// Also check and fix asset references in JS files
const assetsDir = path.resolve(__dirname, 'dist', 'assets');
if (fs.existsSync(assetsDir)) {
  const jsFiles = fs.readdirSync(assetsDir).filter(file => file.endsWith('.js'));
  
  jsFiles.forEach(file => {
    const filePath = path.join(assetsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace absolute paths in JS files
    content = content.replace(/\/img\//g, 'img/');
    
    fs.writeFileSync(filePath, content);
  });
}

// Copy 404.html to dist folder
fs.copyFileSync(
  path.resolve(__dirname, 'public/404.html'),
  path.resolve(__dirname, 'dist/404.html')
);

// Ensure the images directory exists in dist
const distImgDir = path.resolve(__dirname, 'dist', 'assets', 'img');
if (!fs.existsSync(distImgDir)) {
  fs.mkdirSync(distImgDir, { recursive: true });
}

// Copy images from src/assets/img to dist/assets/img
const srcImgDir = path.resolve(__dirname, 'src', 'assets', 'img');
if (fs.existsSync(srcImgDir)) {
  const imgFiles = fs.readdirSync(srcImgDir);
  imgFiles.forEach(file => {
    fs.copyFileSync(
      path.join(srcImgDir, file),
      path.join(distImgDir, file)
    );
    console.log(`✅ Copied image: ${file}`);
  });
}

// Simple script to fix paths in index.html for GitHub Pages deployment
try {
  // No need to modify paths if using custom domain
  // Just ensure CNAME file exists
  const cnamePath = path.resolve(__dirname, 'dist', 'CNAME');
  if (!fs.existsSync(cnamePath)) {
    fs.writeFileSync(cnamePath, 'projectblaze.net');
    console.log('✅ Created CNAME file');
  }
  
  console.log('✅ Deployment preparation complete');
} catch (error) {
  console.error('❌ Error in deploy script:', error);
  process.exit(1);
} 
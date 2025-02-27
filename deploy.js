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

console.log('✅ Fixed paths in index.html for GitHub Pages deployment');

// This is a simple script to copy the 404.html to the dist folder
const fs = require('fs');
const path = require('path');

// Copy 404.html to dist folder
fs.copyFileSync(
  path.resolve(__dirname, 'public/404.html'),
  path.resolve(__dirname, 'dist/404.html')
);

console.log('Deployment files prepared successfully!'); 
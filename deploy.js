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
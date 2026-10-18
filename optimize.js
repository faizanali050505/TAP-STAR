const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, 'lando-norris-clone', 'assets', 'images');
const originalDir = path.join(imgDir, 'original');

if (!fs.existsSync(originalDir)) {
    fs.mkdirSync(originalDir);
}

async function optimizeImages() {
    const files = fs.readdirSync(imgDir);
    
    for (const file of files) {
        if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
            const inputPath = path.join(imgDir, file);
            const ext = path.extname(file);
            const baseName = path.basename(file, ext);
            const outputPath = path.join(imgDir, `${baseName}.webp`);
            const originalPath = path.join(originalDir, file);

            try {
                // Compress and convert to WebP
                await sharp(inputPath)
                    .webp({ 
                        quality: 90, 
                        effort: 6,
                        smartSubsample: true
                    })
                    .toFile(outputPath);
                
                console.log(`Optimized: ${file} -> ${baseName}.webp`);
                
                // Move original to /original folder
                fs.renameSync(inputPath, originalPath);
            } catch (err) {
                console.error(`Error optimizing ${file}:`, err);
            }
        }
    }
}

// Function to update HTML and CSS files
function updateReferences() {
    const rootDir = path.join(__dirname, 'lando-norris-clone');
    
    // Find all HTML and CSS files
    const updateInFile = (filePath) => {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = content.replace(/\.(png|jpg|jpeg)/gi, '.webp');
        if (content !== updated) {
            fs.writeFileSync(filePath, updated, 'utf8');
            console.log(`Updated references in: ${filePath}`);
        }
    };

    const walkDir = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                walkDir(fullPath);
            } else if (fullPath.endsWith('.html') || fullPath.endsWith('.css')) {
                updateInFile(fullPath);
            }
        }
    };

    walkDir(rootDir);
}

async function main() {
    console.log("Starting image optimization...");
    await optimizeImages();
    console.log("Updating HTML and CSS files to use .webp...");
    updateReferences();
    console.log("Optimization complete!");
}

main();

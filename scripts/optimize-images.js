import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const directoryToProcess = "d:/WorkSpace/TRABAJO/LandingPages/hotmart-landings/public/images/te-vas-a-transformar";

async function processImages(dirPath) {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (let entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory()) {
            await processImages(fullPath);
        } else if (entry.isFile() && (entry.name.toLowerCase().endsWith('.jpg') || entry.name.toLowerCase().endsWith('.png') || entry.name.toLowerCase().endsWith('.jpeg'))) {
            try {
                console.log(`Processing: ${fullPath}`);
                const ext = path.extname(fullPath);
                const webpPath = fullPath.substring(0, fullPath.lastIndexOf(ext)) + '.webp';
                
                // Read metadata to check width
                const metadata = await sharp(fullPath).metadata();
                
                let transform = sharp(fullPath);
                
                // Resize if wider than 1920px
                if (metadata.width && metadata.width > 1920) {
                    transform = transform.resize({ width: 1920, withoutEnlargement: true });
                }

                // Format to webp
                await transform.webp({ quality: 80 }).toFile(webpPath);
                
                console.log(`Created: ${webpPath}`);
                
                // Delete original
                await fs.unlink(fullPath);
                console.log(`Deleted original: ${fullPath}`);
                
            } catch (err) {
                console.error(`Error processing ${fullPath}:`, err);
            }
        }
    }
}

processImages(directoryToProcess).then(() => {
    console.log('All images processed successfully.');
}).catch(console.error);

import sharp from "sharp";
import fs from "fs";
import path from "path";
import chokidar from "chokidar";

const imageDir = path.resolve("./src/image");

// Рекурсивно отримуємо всі файли
function getAllFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = entries.flatMap(entry => {
        const res = path.join(dir, entry.name);
        return entry.isDirectory() ? getAllFiles(res) : res;
    });
    return files;
}

// Конвертація одного файлу у WebP
async function convertToWebP(filePath) {
    if (!/\.(jpe?g|png)$/i.test(filePath)) return;

    const ext = path.extname(filePath).toLowerCase();
    const isPNG = ext === ".png";
    const isJPG = ext === ".jpg" || ext === ".jpeg";

    const outputFilePathWebP = path.join(
        path.dirname(filePath),
        `${path.basename(filePath, ext)}.webp`
    );

    // Пропускаємо, якщо WebP вже актуальний
    if (fs.existsSync(outputFilePathWebP)) {
        const srcMtime = fs.statSync(filePath).mtimeMs;
        const destMtime = fs.statSync(outputFilePathWebP).mtimeMs;
        if (destMtime >= srcMtime) return;
    }

    try {
        if (isPNG) {
            // PNG → WebP Lossless (ідеальна графіка)
            await sharp(filePath)
                .webp({ lossless: true })
                .toFile(outputFilePathWebP);

        } else if (isJPG) {
            // JPG → WebP Lossy (краще для фото)
            await sharp(filePath)
                .webp({
                    quality: 100,
                    effort: 6,     // рівень компресії
                })
                .toFile(outputFilePathWebP);
        }

        // console.log(`Конвертовано: ${filePath}`);

    } catch (err) {
        // console.error(`Помилка при конвертації ${filePath}:`, err);
    }
}

// Оптимізація всіх зображень
async function optimizeAllImages() {
    if (!fs.existsSync(imageDir)) return;
    const files = getAllFiles(imageDir);
    for (const file of files) {
        await convertToWebP(file);
    }
}

// Спостерігач
function watchImages() {
    const watcher = chokidar.watch(imageDir, {
        persistent: true,
        ignoreInitial: true,
        depth: 99,
    });

    watcher.on("add", convertToWebP);
    watcher.on("change", convertToWebP);

    // console.log(`Спостерігач запущено для ${imageDir}`);
}

// Запуск
(async () => {
    await optimizeAllImages();
    watchImages();
})();
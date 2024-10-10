import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs-extra';
import { env } from './env.mjs';

const inputDir = 'public';
const outputDir = `dist${env.sub_directory ? '/' + env.sub_directory : ''}`;
const imagePaths = glob.sync(path.join(inputDir, '**/*.{jpg,jpeg,png}'));

const compressAndSaveImage = async (inputPath, outputPath) => {
  try {
    sharp(inputPath).webp().toFile(outputPath);
  } catch (error) {
    console.error(`Error compressing image: ${inputPath}`, error);
    throw error;
  }
};

const compressAndSaveAllImages = async () => {
  console.log('Compressing public/images/**/* ...');
  await Promise.all(
    imagePaths.map(async (imagePath) => {
      const relativePath = path.relative(inputDir, imagePath);
      const outputPath = path.join(outputDir, relativePath).replace(/\.(jpg|png|jpeg)$/, '.webp');
      await fs.ensureDir(path.dirname(outputPath));
      compressAndSaveImage(imagePath, outputPath);
    }),
  );
  console.log('All images compressed');
};

export { compressAndSaveAllImages };

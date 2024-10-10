import fs from 'fs-extra';
import path from 'path';
import chokidar from 'chokidar';
import { glob } from 'glob';
import { env } from './env.mjs';

const publicDir = path.resolve('public');
const distDir = path.resolve('dist', `${env.sub_directory || ''}`);
const files = glob.sync(path.join(publicDir, '**/*.*'));
const filteredFiles = files.filter((file) => {
  const ext = path.extname(file).toLowerCase();
  return ext !== '.png' && ext !== '.jpeg' && ext !== '.jpg';
});

const copy =
  filteredFiles?.length > 0
    ? async () => {
        console.log('Coping public/**/* ...');
        await Promise.all(
          filteredFiles.map(async (file) => {
            const relativePath = path.relative(publicDir, file);
            const targetPath = path.resolve(distDir, relativePath);
            fs.copy(file, targetPath, { overwrite: true });
          }),
        );
        console.log('All files copied');
      }
    : async () => {
        console.log('The copy process will not work unless there are HTML or PDF files under public/');
      };

const watchPublic = async () => {
  const watcher = chokidar.watch(publicDir);
  console.log('watching public/**/* ...');
  watcher.on('change', async (filePath) => {
    const relativePath = path.relative(publicDir, filePath);
    const targetPath = path.resolve(distDir, relativePath);
    await fs.copy(filePath, targetPath, { overwrite: true });
    console.log('File copied');
  });
};

export { copy, watchPublic };

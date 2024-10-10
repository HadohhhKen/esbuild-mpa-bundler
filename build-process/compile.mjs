import * as sass from 'sass';
import autoprefixer from 'autoprefixer';
import combineMediaQuery from 'postcss-combine-media-query';
import postcss from 'postcss';
import { glob } from 'glob';
import * as path from 'path';
import fs from 'fs-extra';
import chokidar from 'chokidar';
import { env } from './env.mjs';
const isDev = process.argv[2] === 'development';
const { sync } = glob;
const inputFiles = sync(path.resolve('src', 'assets', 'css', '*.scss'));
const outputFiles = inputFiles.reduce((acc, item) => {
  const outputFile = item
    .replace('src', `dist${env.sub_directory ? '/' + env.sub_directory : ''}`)
    .replace('.scss', '.css');
  acc.push(outputFile);
  return acc;
}, []);

fs.mkdirSync(path.resolve('dist', `${env.sub_directory || ''}`, 'assets', 'css'), {
  recursive: true,
});

const compileSass =
  inputFiles?.length > 0
    ? async () => {
        console.log('Compiling src/assets/css/**/* ...');
        await Promise.all(
          inputFiles.map(async (item, index) => {
            const result = await sass.compileAsync(
              item,
              isDev
                ? {
                    sourceMap: true,
                    sourceMapEmbed: true,
                    sourceMapIncludeSources: true,
                  }
                : undefined,
            );
            const prefixedResult = await postcss([autoprefixer, combineMediaQuery]).process(result.css, {
              from: undefined,
              map: isDev
                ? {
                    inline: true,
                    prev: result.sourceMap,
                  }
                : undefined,
            });
            fs.writeFileSync(outputFiles[index], prefixedResult.css);
          }),
        );
        console.log('All sass compiled');
      }
    : async () => {
        console.log('The compile will not work unless there is an SCSS file directly under src/assets/css/');
      };

const watchSass = async () => {
  const watcher = chokidar.watch(path.resolve('src', 'assets', 'css'));
  console.log('watching src/css/**/* ...');
  watcher.on('change', async () => {
    await compileSass();
    console.log('Sass compiled');
  });
};

export { compileSass, watchSass };

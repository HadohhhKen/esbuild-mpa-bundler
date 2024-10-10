import esbuild from 'esbuild';
import vuePlugin from 'esbuild-plugin-vue3';
import autoprefixer from 'autoprefixer';
import combineMediaQuery from 'postcss-combine-media-query';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import browserSync from 'browser-sync';
import path from 'path';
import { glob } from 'glob';
import { env } from './env.mjs';

const { sync } = glob;

const app = express();
const port = 3000;
const entryPoints = sync(path.resolve('src', 'assets', 'js', '*.ts')).reduce((acc, filePath) => {
  const fileName = path.basename(filePath, '.ts');
  const outPath = path.join('assets/js', fileName);
  acc.push({ out: outPath, in: filePath });
  return acc;
}, []);

const buildOptions = {
  entryPoints,
  bundle: true,
  minify: process.argv[2] === 'development' ? false : true,
  sourcemap: process.argv[2] === 'development' ? true : false,
  treeShaking: true,
  drop: process.argv[2] === 'development' ? [] : ['console', 'debugger'],
  write: true,
  outdir: path.resolve('dist', env.sub_directory || ''),
  plugins: [
    vuePlugin({
      cssInline: true,
      css: {
        sourceMap: true,
      },
      postcss: {
        sourceMap: true,
        plugins: [autoprefixer, combineMediaQuery],
      },
    }),
  ],
  loader: {
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.svg': 'file',
    '.webp': 'file',
  },
};

if (process.argv[2] === 'development') {
  buildOptions.plugins.push({
    name: 'reload',
    setup(build) {
      let startCount = 0;
      let endCount = 0;
      build.onStart(() => {
        startCount++;
        if (startCount >= 2) {
          console.log('Rebuilding src/assets/js/**/* ...');
        }
      });
      build.onEnd(async () => {
        endCount++;
        if (endCount <= 1) {
          console.log('All ts|vue build');
          serve();
        } else {
          console.log('ts|vue rebuild');
        }
      });
    },
  });
}

const build =
  entryPoints?.length > 0
    ? async () => {
        if (process.argv[2] === 'development') {
          let ctx = await esbuild.context(buildOptions);
          await ctx.watch();
          console.log('Building src/assets/js/**/* ...');
        } else {
          console.log('Building src/assets/js/**/* ...');
          await esbuild.build(buildOptions);
          console.log('All ts|vue build');
        }
      }
    : async () => {
        console.log('The build will not work unless there is a TypeScript file directly under src/assets/js/');
      };

const serve = async () => {
  app.use(express.static(path.resolve('dist')));
  if (env?.proxy_base?.length > 0) {
    app.use(
      createProxyMiddleware({
        /**
         * v3 breaking changes
         * Removed context argument
         * https://github.com/chimurai/http-proxy-middleware/blob/master/MIGRATION.md#removed-context-argument
         */
        pathFilter: env.proxy_base,
        target: env.proxy_target || '',
        changeOrigin: true,
      }),
    );
  }

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/${env.sub_directory ? env.sub_directory + '/' : ''}`);
  });

  browserSync.init({
    proxy: `http://localhost:${port}/${env.sub_directory ? env.sub_directory + '/' : ''}`,
    files: ['./dist/**/*'],
    open: 'external',
    notify: false,
    logFileChanges: false,
    logLevel: 'info',
  });
};

export { build, serve };

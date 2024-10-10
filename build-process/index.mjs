import { compressAndSaveAllImages } from './sharp.mjs';
import { copy, watchPublic } from './copy.mjs';
import { compileSass, watchSass } from './compile.mjs';
import { build } from './build.mjs';

Promise.all([compressAndSaveAllImages(), copy(), compileSass(), build()]).then(async () => {
  if (process.argv[2] === 'development') {
    watchPublic();
    watchSass();
    // TS|VUE is watching by build()
  } else {
    console.log('Done');
  }
});

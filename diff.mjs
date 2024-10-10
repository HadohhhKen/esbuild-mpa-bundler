import { spawnSync } from 'child_process';
import fs from 'fs-extra';

const buildCommand = 'npm run build';
const tempDir = './diffDist';
console.log('get diff:');

(async () => {
  const currentBranch = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { encoding: 'utf-8' }).stdout.trim();
  try {
    await fs.remove(tempDir);
    await fs.mkdir(tempDir);
    spawnSync('npm i');
    spawnSync(buildCommand, { stdio: 'inherit', shell: true });
    await fs.copy('./dist', tempDir);
    await fs.copy('./template', tempDir);
    spawnSync('git', ['init'], { cwd: tempDir, stdio: 'inherit' });
    spawnSync('git', ['add', '.'], { cwd: tempDir });
    spawnSync('git', ['commit', '-m', `${currentBranch} build`], {
      cwd: tempDir,
    });
    spawnSync('sh', ['-c', `find ${tempDir} ! -path '${tempDir}/.git*' -delete`]);
    spawnSync('git', ['checkout', 'main'], { stdio: 'inherit' });
    spawnSync('npm i');
    spawnSync(buildCommand, { stdio: 'inherit', shell: true });
    await fs.copy('./dist', tempDir);
    await fs.copy('./template', tempDir);
    spawnSync('git', ['add', '.'], { cwd: tempDir });
    spawnSync('git', ['commit', '-m', 'main branch build'], { cwd: tempDir });
    const log = spawnSync('git', ['log', '--name-status', '-1'], {
      cwd: tempDir,
    });
    fs.writeFileSync('./log.txt', log.stdout);
  } catch (error) {
    console.error('error:', error.message);
  } finally {
    await fs.remove(tempDir);
  }
})();

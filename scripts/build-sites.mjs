import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const distSites = resolve(root, 'dist', 'sites');

function run(command, args, env = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    env: { ...process.env, ...env },
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function resetDir(path) {
  rmSync(path, { recursive: true, force: true });
  mkdirSync(path, { recursive: true });
}

function copySite(src, dest) {
  if (!existsSync(src)) {
    throw new Error(`Missing source directory: ${src}`);
  }
  resetDir(dest);
  cpSync(src, dest, { recursive: true });
}

mkdirSync(distSites, { recursive: true });

run('npx', ['astro', 'build'], {
  NAMCHE_OUT_DIR: 'dist/sites/namche',
});

copySite(resolve(root, 'agents', 'tashi', 'public'), resolve(distSites, 'tashi'));
copySite(resolve(root, 'agents', 'nima', 'public'), resolve(distSites, 'nima'));
copySite(resolve(root, 'agents', 'pema', 'public'), resolve(distSites, 'pema'));

console.log('[build-sites] complete');

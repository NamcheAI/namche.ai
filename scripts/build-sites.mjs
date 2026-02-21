import { spawnSync } from 'node:child_process';

const sites = ['namche', 'tashi', 'nima', 'pema'];

function run(command, args, env = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    env: { ...process.env, ...env },
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

for (const site of sites) {
  run('npx', ['astro', 'build'], {
    NAMCHE_SITE: site,
    NAMCHE_OUT_DIR: `dist/sites/${site}`,
  });
}

console.log('[build-sites] complete');

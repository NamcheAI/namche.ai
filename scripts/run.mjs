import { spawnSync } from 'node:child_process';

const mode = process.argv[2] ?? 'dev';
const args = process.argv.slice(3);

const VALID_MODES = new Set(['dev', 'preview', 'build-sites', 'build-site']);
const VALID_SITES = new Set(['namche', 'tashi', 'nima', 'pema']);

if (!VALID_MODES.has(mode)) {
  console.error(`Invalid mode: ${mode}. Use one of: dev, preview, build-sites, build-site.`);
  process.exit(1);
}

function parseCliArg(name) {
  const prefix = `--${name}=`;
  const direct = args.find((arg) => arg.startsWith(prefix));
  if (direct) return direct.slice(prefix.length);

  const idx = args.indexOf(`--${name}`);
  if (idx >= 0 && args[idx + 1]) return args[idx + 1];

  return undefined;
}

const site = parseCliArg('site') ?? process.env.NAMCHE_SITE ?? 'namche';

if (!VALID_SITES.has(site)) {
  console.error(`Invalid site: ${site}. Use one of: namche, tashi, nima, pema.`);
  process.exit(1);
}

const passThroughArgs = args.filter((arg, index) => {
  if (arg.startsWith('--site=')) return false;
  if (arg === '--site') return false;
  if (index > 0 && args[index - 1] === '--site') return false;
  return true;
});

function run(command, commandArgs, env = {}) {
  const result = spawnSync(command, commandArgs, {
    stdio: 'inherit',
    env: { ...process.env, ...env },
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (mode === 'build-sites') {
  run('node', ['scripts/build-sites.mjs', ...passThroughArgs]);
  process.exit(0);
}

if (mode === 'build-site') {
  run('npx', ['astro', 'build', ...passThroughArgs], { NAMCHE_SITE: site });
  process.exit(0);
}

if (mode === 'preview') {
  run('npx', ['astro', 'preview', ...passThroughArgs]);
  process.exit(0);
}

run('npx', ['astro', 'dev', '--host', '0.0.0.0', '--port', '4321', ...passThroughArgs], { NAMCHE_SITE: site });

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawn, spawnSync } from 'node:child_process';

const mode = process.argv[2] ?? 'dev';
const args = process.argv.slice(3);

const VALID_MODES = new Set(['dev', 'start', 'build-sites', 'build-namche']);
const VALID_TARGETS = new Set(['namche', 'gateway']);
const VALID_SITES = new Set(['namche', 'tashi', 'nima', 'pema']);

if (!VALID_MODES.has(mode)) {
  console.error(`Invalid mode: ${mode}. Use one of: dev, start, build-sites, build-namche.`);
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

function loadConfig() {
  const configPath = resolve(process.cwd(), 'run.config.json');
  if (!existsSync(configPath)) return {};

  try {
    return JSON.parse(readFileSync(configPath, 'utf-8'));
  } catch (error) {
    console.error(`Failed to parse run.config.json: ${error.message}`);
    process.exit(1);
  }
}

function run(command, commandArgs, extraEnv = {}) {
  const child = spawn(command, commandArgs, {
    stdio: 'inherit',
    shell: false,
    env: {
      ...process.env,
      ...extraEnv,
    },
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    process.exit(code ?? 1);
  });
}

const config = loadConfig();
const defaultTarget = mode === 'dev' ? 'namche' : 'gateway';
const target = parseCliArg('target') ?? process.env.NAMCHE_TARGET ?? config.target ?? defaultTarget;
const site = parseCliArg('site') ?? process.env.NAMCHE_SITE ?? config.site ?? 'namche';

if (!VALID_TARGETS.has(target)) {
  console.error(`Invalid target: ${target}. Use one of: namche, gateway.`);
  process.exit(1);
}

if (!VALID_SITES.has(site)) {
  console.error(`Invalid site: ${site}. Use one of: namche, tashi, nima, pema.`);
  process.exit(1);
}

const passThroughArgs = args.filter((arg, index) => {
  if (arg.startsWith('--target=')) return false;
  if (arg.startsWith('--site=')) return false;
  if (arg === '--target' || arg === '--site') return false;
  if (index > 0 && (args[index - 1] === '--target' || args[index - 1] === '--site')) return false;
  return true;
});

if (mode === 'build-sites') {
  const result = spawnSync('node', ['scripts/build-sites.mjs', ...passThroughArgs], {
    stdio: 'inherit',
    env: process.env,
  });
  process.exit(result.status ?? 1);
}

if (mode === 'build-namche') {
  const result = spawnSync('npx', ['astro', 'build', ...passThroughArgs], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NAMCHE_SITE: site,
    },
  });
  process.exit(result.status ?? 1);
}

if (target === 'namche') {
  if (mode === 'dev') {
    run('npx', ['astro', 'dev', '--host', '0.0.0.0', '--port', '4321', ...passThroughArgs], {
      NAMCHE_SITE: site,
    });
  } else {
    run('npx', ['astro', 'preview', ...passThroughArgs]);
  }
} else {
  const extraEnv = {};
  const cfg = config.gateway ?? {};
  if (!process.env.PORT && cfg.port) {
    extraEnv.PORT = String(cfg.port);
  }
  if (!process.env.HOST && cfg.host) {
    extraEnv.HOST = String(cfg.host);
  }
  if (!process.env.NAMCHE_HOST_CONFIG && cfg.configPath) {
    extraEnv.NAMCHE_HOST_CONFIG = String(cfg.configPath);
  }

  run('node', ['server/index.mjs', ...passThroughArgs], extraEnv);
}

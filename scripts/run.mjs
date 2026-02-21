import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';

const mode = process.argv[2] ?? 'dev';
const args = process.argv.slice(3);

const VALID_MODES = new Set(['dev', 'start']);
const VALID_TARGETS = new Set(['namche', 'tashi', 'nima', 'pema']);

if (!VALID_MODES.has(mode)) {
  console.error(`Invalid mode: ${mode}. Use one of: dev, start.`);
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

const config = loadConfig();
const target = parseCliArg('target') ?? process.env.NAMCHE_TARGET ?? config.target ?? 'namche';

if (!VALID_TARGETS.has(target)) {
  console.error(`Invalid target: ${target}. Use one of: namche, tashi, nima, pema.`);
  process.exit(1);
}

const passThroughArgs = args.filter((arg, index) => {
  if (arg.startsWith('--target=')) return false;
  if (arg === '--target') return false;
  if (index > 0 && args[index - 1] === '--target') return false;
  return true;
});

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

if (target === 'namche') {
  if (mode === 'dev') {
    run('npx', ['astro', 'dev', '--host', '0.0.0.0', '--port', '4321', ...passThroughArgs]);
  } else {
    run('npx', ['astro', 'preview', ...passThroughArgs]);
  }
} else {
  const agentDir = `agents/${target}`;
  const agentPortFromConfig = config.ports && typeof config.ports === 'object' ? config.ports[target] : undefined;
  const portFromConfig = agentPortFromConfig != null ? String(agentPortFromConfig) : undefined;

  const extraEnv = {};
  if (!process.env.PORT && portFromConfig) {
    extraEnv.PORT = portFromConfig;
  }

  run('npm', ['--prefix', agentDir, 'run', mode, ...passThroughArgs], extraEnv);
}

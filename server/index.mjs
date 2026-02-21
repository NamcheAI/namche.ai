import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

const configPath = resolve(process.cwd(), process.env.NAMCHE_HOST_CONFIG ?? 'server/hosts.config.json');

if (!existsSync(configPath)) {
  throw new Error(`Host config not found: ${configPath}`);
}

const config = JSON.parse(readFileSync(configPath, 'utf-8'));

const sites = config.sites ?? {};
const defaultSite = config.defaultSite ?? 'namche';
const listenHost = process.env.HOST ?? config.listen?.host ?? '0.0.0.0';
const listenPort = Number(process.env.PORT ?? config.listen?.port ?? 8443);

const hostToSite = new Map();
for (const [siteId, siteConfig] of Object.entries(sites)) {
  for (const host of siteConfig.hosts ?? []) {
    hostToSite.set(String(host).toLowerCase(), siteId);
  }
}

function stripPort(hostHeader) {
  if (!hostHeader) return '';
  return hostHeader.split(':')[0].toLowerCase();
}

function resolveSiteFromRequest(c) {
  const hostHeader = stripPort(c.req.header('host'));
  return hostToSite.get(hostHeader) ?? defaultSite;
}

function getSiteConfig(siteId) {
  return sites[siteId] ?? null;
}

function getContentType(pathname) {
  if (pathname.endsWith('.html')) return 'text/html; charset=utf-8';
  if (pathname.endsWith('.css')) return 'text/css; charset=utf-8';
  if (pathname.endsWith('.js') || pathname.endsWith('.mjs')) return 'application/javascript; charset=utf-8';
  if (pathname.endsWith('.json')) return 'application/json; charset=utf-8';
  if (pathname.endsWith('.svg')) return 'image/svg+xml';
  if (pathname.endsWith('.png')) return 'image/png';
  if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) return 'image/jpeg';
  if (pathname.endsWith('.ico')) return 'image/x-icon';
  if (pathname.endsWith('.webmanifest')) return 'application/manifest+json; charset=utf-8';
  if (pathname.endsWith('.xml')) return 'application/xml; charset=utf-8';
  if (pathname.endsWith('.txt')) return 'text/plain; charset=utf-8';
  if (pathname.endsWith('.woff2')) return 'font/woff2';
  return 'application/octet-stream';
}

function safeResolve(rootDir, requestPath) {
  const decodedPath = decodeURIComponent(requestPath);
  const normalizedPath = decodedPath === '/' ? '/index.html' : decodedPath;

  const root = resolve(process.cwd(), rootDir);
  const fullPath = resolve(root, `.${normalizedPath}`);

  if (!fullPath.startsWith(root)) return null;
  return { root, fullPath };
}

app.get('/healthz', (c) => {
  return c.json({ ok: true, service: 'gateway', defaultSite, configPath });
});

app.post('/webhooks/:source', async (c) => {
  const siteId = resolveSiteFromRequest(c);
  const siteConfig = getSiteConfig(siteId);

  if (!siteConfig) {
    return c.json({ ok: false, error: `No site config for '${siteId}'` }, 500);
  }

  const webhookSecretEnv = siteConfig.webhookSecretEnv;
  const expectedSecret = webhookSecretEnv ? process.env[webhookSecretEnv] : undefined;

  if (expectedSecret) {
    const provided = c.req.header('x-webhook-secret');
    if (!provided || provided !== expectedSecret) {
      return c.json({ ok: false, error: 'unauthorized' }, 401);
    }
  }

  const source = c.req.param('source');
  const body = await c.req.text();
  console.log(`[gateway] site=${siteId} webhook=${source} bytes=${body.length}`);

  return c.json({ ok: true, site: siteId, source, accepted: true }, 202);
});

app.get('*', (c) => {
  const siteId = resolveSiteFromRequest(c);
  const siteConfig = getSiteConfig(siteId);

  if (!siteConfig) {
    return c.text(`Unknown site mapping for '${siteId}'`, 404);
  }

  const resolved = safeResolve(siteConfig.staticDir, c.req.path);
  if (!resolved) return c.text('Invalid path', 400);

  const { root, fullPath } = resolved;

  try {
    if (existsSync(fullPath) && statSync(fullPath).isFile()) {
      const contentType = getContentType(fullPath);
      return c.body(readFileSync(fullPath), 200, { 'content-type': contentType });
    }

    const fallback = resolve(root, 'index.html');
    if (existsSync(fallback)) {
      return c.html(readFileSync(fallback, 'utf-8'));
    }

    return c.text(`Static file not found: ${fullPath}`, 404);
  } catch (error) {
    return c.text(`Failed to serve static file: ${error.message}`, 500);
  }
});

serve({ fetch: app.fetch, hostname: listenHost, port: listenPort }, () => {
  console.log(`[gateway] listening on ${listenHost}:${listenPort}`);
  console.log(`[gateway] config ${configPath}`);
});

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';

interface AgentRuntimeOptions {
  agentId: string;
  defaultPort?: number;
  publicDir?: string;
}

export function startAgentRuntime(options: AgentRuntimeOptions): void {
  const { agentId, defaultPort = 8443, publicDir = './public' } = options;

  const app = new Hono();
  const port = Number(process.env.PORT ?? defaultPort);
  const webhookSecret = process.env.WEBHOOK_SECRET;
  const indexPath = resolve(publicDir, 'index.html');

  app.get('/healthz', (c) => c.json({ ok: true, agent: agentId }));

  app.post('/webhooks/:source', async (c) => {
    if (webhookSecret) {
      const provided = c.req.header('x-webhook-secret');
      if (!provided || provided !== webhookSecret) {
        return c.json({ ok: false, error: 'unauthorized' }, 401);
      }
    }

    const source = c.req.param('source');
    const body = await c.req.text();
    console.log(`[${agentId}] webhook:${source} bytes=${body.length}`);

    return c.json({ ok: true, agent: agentId, source, accepted: true }, 202);
  });

  app.use('/*', serveStatic({ root: publicDir }));

  app.get('*', (c) => {
    if (!existsSync(indexPath)) {
      return c.text(`${agentId} homepage missing: ${indexPath}`, 500);
    }

    return c.html(readFileSync(indexPath, 'utf-8'));
  });

  serve({ fetch: app.fetch, port }, (info) => {
    console.log(`[${agentId}] listening on :${info.port}`);
  });
}

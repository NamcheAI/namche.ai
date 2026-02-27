# namche.ai

Astro static site generator for:

- `namche.ai`
- `tashi.namche.ai`
- `nima.namche.ai`
- `pema.namche.ai`

Webhook routing/proxy is in a separate repository:

- `https://github.com/NamcheAI/webhook-proxy`

Brand reference:

- `docs/Mycelia Styleguide v0.1.pdf`

## Editing Content

All site content now lives in one place per site:

- `src/sites/namche.astro`
- `src/sites/tashi.astro`
- `src/sites/nima.astro`
- `src/sites/pema.astro`

Each file contains both:

- page metadata (`title`, `description`, `brandLabel`)
- full page markup/content

Shared rendering shell:

- `src/layouts/Base.astro`
- `src/styles/global.css`

## Local Development

Install dependencies:

```bash
npm install
```

Run dev server for one site variant:

```bash
npm run dev -- --site namche
npm run dev -- --site tashi
npm run dev -- --site nima
npm run dev -- --site pema
```

Optional environment variable for the Tashi complaint form webhook.
Default endpoint:

```bash
https://api.namche.ai/v1/webhooks/agents/tashi/complaint
```

Override if needed:

```bash
PUBLIC_TASHI_COMPLAINT_WEBHOOK_URL=https://api.namche.ai/webhooks/tashi/complaint
```

## Build

Build all sites:

```bash
npm run build:sites
```

Build one site:

```bash
npm run build:site -- --site tashi
```

Build output:

- `dist/sites/namche`
- `dist/sites/tashi`
- `dist/sites/nima`
- `dist/sites/pema`

Preview build:

```bash
npm start
```

## CI Deploy

Workflow:

- `.github/workflows/deploy.yaml`

Trigger:

- each push to `main`
- manual dispatch from Actions tab

Deployment target on `bertrand.batlogg.com`:

- `/var/www/html/namche.ai`
- `/var/www/html/tashi.namche.ai`
- `/var/www/html/nima.namche.ai`
- `/var/www/html/pema.namche.ai`

Important:

- target directories must already exist
- deploy user must have write permission to those directories

Required repository secrets:

- `DEPLOY_SSH_KEY`

Required repository variables:

- `DEPLOY_KNOWN_HOSTS` (from `ssh-keyscan bertrand.batlogg.com`)

Deployment uses hardcoded SSH settings:

- user: `deploy`

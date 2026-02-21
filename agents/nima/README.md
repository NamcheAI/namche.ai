# Nima Agent

Hono runtime for Nima website and webhook proxy.

## Local Run

```bash
cd agents/nima
npm install
cp .env.example .env
npm run dev
```

## Production Build

```bash
cd agents/nima
npm ci
npm run build
mkdir -p logs
```

## launchctl Template (User Space)

Template file:

- `deploy/ai.namche.nima.plist.template`

Replace placeholders:

- `__WORKDIR__` -> absolute path to `agents/nima`

Create concrete plist:

```bash
cp deploy/ai.namche.nima.plist.template deploy/ai.namche.nima.plist
```

Install in user space:

```bash
cp deploy/ai.namche.nima.plist ~/Library/LaunchAgents/
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/ai.namche.nima.plist
```

Manage:

```bash
launchctl list | grep ai.namche.nima
launchctl kickstart -k gui/$(id -u)/ai.namche.nima
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/ai.namche.nima.plist
```

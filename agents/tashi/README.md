# Tashi Agent

Hono runtime for Tashi website and webhook proxy.

## Local Run

```bash
cd agents/tashi
npm install
cp .env.example .env
npm run dev
```

## Production Build

```bash
cd agents/tashi
npm ci
npm run build
mkdir -p logs
```

## launchctl Template (User Space)

Template file:

- `deploy/ai.namche.tashi.plist.template`

Replace placeholders:

- `__WORKDIR__` -> absolute path to `agents/tashi`

Create concrete plist:

```bash
cp deploy/ai.namche.tashi.plist.template deploy/ai.namche.tashi.plist
```

Install in user space:

```bash
cp deploy/ai.namche.tashi.plist ~/Library/LaunchAgents/
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/ai.namche.tashi.plist
```

Manage:

```bash
launchctl list | grep ai.namche.tashi
launchctl kickstart -k gui/$(id -u)/ai.namche.tashi
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/ai.namche.tashi.plist
```

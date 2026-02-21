# Pema Agent

Hono runtime for Pema website and webhook proxy.

## Local Run

```bash
cd agents/pema
npm install
cp .env.example .env
npm run dev
```

## Production Build

```bash
cd agents/pema
npm ci
npm run build
mkdir -p logs
```

## launchctl Template (User Space)

Template file:

- `deploy/ai.namche.pema.plist.template`

Replace placeholders:

- `__WORKDIR__` -> absolute path to `agents/pema`

Create concrete plist:

```bash
cp deploy/ai.namche.pema.plist.template deploy/ai.namche.pema.plist
```

Install in user space:

```bash
cp deploy/ai.namche.pema.plist ~/Library/LaunchAgents/
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/ai.namche.pema.plist
```

Manage:

```bash
launchctl list | grep ai.namche.pema
launchctl kickstart -k gui/$(id -u)/ai.namche.pema
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/ai.namche.pema.plist
```

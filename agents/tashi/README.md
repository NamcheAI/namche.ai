# Tashi Agent

Hono runtime for Tashi website + webhook proxy.

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

## launchd Template

Template file:

- `deploy/com.namche.tashi.plist.template`

Replace placeholders:

- `__WORKDIR__` -> absolute path to `agents/tashi`
- `__USER__` -> macOS user running the service

Create concrete plist:

```bash
cp deploy/com.namche.tashi.plist.template deploy/com.namche.tashi.plist
```

Then install:

```bash
sudo cp deploy/com.namche.tashi.plist /Library/LaunchDaemons/
sudo launchctl load /Library/LaunchDaemons/com.namche.tashi.plist
```

Manage:

```bash
sudo launchctl list | grep com.namche.tashi
sudo launchctl kickstart -k system/com.namche.tashi
sudo launchctl unload /Library/LaunchDaemons/com.namche.tashi.plist
```

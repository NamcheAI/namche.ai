# Nima Agent

Hono runtime for Nima website + webhook proxy.

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

## launchd Template

Template file:

- `deploy/com.namche.nima.plist.template`

Replace placeholders:

- `__WORKDIR__` -> absolute path to `agents/nima`
- `__USER__` -> macOS user running the service

Create concrete plist:

```bash
cp deploy/com.namche.nima.plist.template deploy/com.namche.nima.plist
```

Then install:

```bash
sudo cp deploy/com.namche.nima.plist /Library/LaunchDaemons/
sudo launchctl load /Library/LaunchDaemons/com.namche.nima.plist
```

Manage:

```bash
sudo launchctl list | grep com.namche.nima
sudo launchctl kickstart -k system/com.namche.nima
sudo launchctl unload /Library/LaunchDaemons/com.namche.nima.plist
```

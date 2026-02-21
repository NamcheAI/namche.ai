# Pema Agent

Hono runtime for Pema website + webhook proxy.

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

## launchd Template

Template file:

- `deploy/com.namche.pema.plist.template`

Replace placeholders:

- `__WORKDIR__` -> absolute path to `agents/pema`
- `__USER__` -> macOS user running the service

Create concrete plist:

```bash
cp deploy/com.namche.pema.plist.template deploy/com.namche.pema.plist
```

Then install:

```bash
sudo cp deploy/com.namche.pema.plist /Library/LaunchDaemons/
sudo launchctl load /Library/LaunchDaemons/com.namche.pema.plist
```

Manage:

```bash
sudo launchctl list | grep com.namche.pema
sudo launchctl kickstart -k system/com.namche.pema
sudo launchctl unload /Library/LaunchDaemons/com.namche.pema.plist
```

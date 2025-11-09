# 🚀 Quickstart — S.M.A.R.T Docker Installer (Public v2.2)

## Prerequisites
- Node.js ≥ 20, Docker Engine ≥ 25 (with Compose v2), Git ≥ 2.45  
- Outbound Internet access (port 443)  
- Optional: Portainer ≥ 2.19

## Installation
```bash
git clone https://github.com/<your-org>/smart-docker-installer.git
cd smart-docker-installer
npm ci || true
```

## Dry-Run (No Changes Applied)
```bash
node stacklink-smart_v2.2.js --config ./smart.config.json --dry-run --log json
```

## Deployment (Portainer / Swarm / Local)
```bash
# Portainer (provide API token via ENV)
export PORTAINER_API_TOKEN=***
node stacklink-smart_v2.2.js --config ./smart.config.json --target portainer-prod --log json

# Swarm
node stacklink-smart_v2.2.js --config ./smart.config.json --target swarm-cluster

# Local verification only
node stacklink-smart_v2.2.js --config ./smart.config.json --target local-compose
```

## Verification
- Check for Exit-Code = 0 and health report at `./.state/last_run.json`
- Logs: `./logs/installer.log` (secrets are masked)

## Rollback Example
- Swarm: `docker stack rm smart_installer_swarm`
- Portainer: remove stack via UI (respect Zero-Destruction policy)

## Security Notes
- Never commit secrets to Git
- Only use TLS endpoints (HTTP connections are blocked)

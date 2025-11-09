# S.M.A.R.T Docker Installer - Installation Guide v2.3

**Einfache Schritt-für-Schritt-Anleitung für die Einrichtung und ersten Deployment**

**Version:** 2.3 (Public Pro CLI)  
**Lizenz:** OPSL-1.0-Public Edition  
**Stand:** 09. November 2025  
**Autor:** Sebastian Huehn

---

## 📋 Inhaltsverzeichnis

1. [Voraussetzungen](#voraussetzungen)
2. [Quick-Start mit --init](#1-quick-start-mit---init-neu-in-v23)
3. [Systemdiagnose mit --doctor](#2-systemdiagnose-mit---doctor-neu-in-v23)
4. [GitHub Vorbereitung](#3-github-vorbereitung)
5. [Portainer Vorbereitung](#4-portainer-vorbereitung)
6. [Docker Swarm Vorbereitung (Optional)](#5-docker-swarm-vorbereitung-optional)
7. [Installer Installation](#6-installer-installation)
8. [Konfiguration erstellen](#7-konfiguration-erstellen)
9. [Erstes Deployment (Dry-Run)](#8-erstes-deployment-dry-run)
10. [Live Deployment](#9-live-deployment)
11. [Multi-Target & Parallel Deployments](#10-multi-target--parallel-deployments-neu-in-v23)
12. [Rollback-Strategien](#11-rollback-strategien)
13. [Webhook-Server](#12-webhook-server-neu-in-v23)
14. [Monitoring & Metrics](#13-monitoring--metrics)
15. [Automatisierung](#14-automatisierung)
16. [Troubleshooting](#troubleshooting)

---

## Voraussetzungen

### Software auf dem Server:
- ✅ **Node.js 20+** (für den Installer)
- ✅ **Git 2.30+** (für Repository-Cloning)
- ✅ **Docker 24.0+** (für Container)
- ✅ **Docker Compose v2.20+** (für Stack-Management)
- ✅ **OpenSSH 8.0+** (für SSH Deploy Keys)

### Optional für Swarm:
- ✅ **Docker Swarm Mode** aktiviert
- ✅ **Overlay Network** konfiguriert

### Zugriffe:
- ✅ **GitHub Account** mit Repository-Zugriff
- ✅ **Portainer Instanz** mit Admin-Zugriff ODER
- ✅ **Docker Swarm Manager** Zugriff
- ✅ **SSH-Zugriff** auf den Zielserver (root oder sudo)

### Sicherheitsanforderungen (v2.3):
- ✅ **TLS 1.2+** für alle HTTPS-Verbindungen
- ✅ **SSH Strict Host Key Checking** aktiviert
- ✅ **State-Files** mit `0600` Permissions
- ✅ **Credential-Redaction** in allen Logs

---

## 1. Quick-Start mit `--init` (NEU in v2.3)

**Der schnellste Weg zum ersten Deployment!**

### 1.1 Installer herunterladen

```bash
# Installer herunterladen:
curl -fsSL https://raw.githubusercontent.com/sebastian-huehn/agi-smart-installer/v2.3.0/stacklink-smart.js -o stacklink-smart.js

# Ausführbar machen:
chmod +x stacklink-smart.js

# Version prüfen:
./stacklink-smart.js --version
# Ausgabe: S.M.A.R.T Docker Installer v2.3.0
```

### 1.2 Interaktive Initialisierung

```bash
# Erstellt automatisch: smart.config.json, .env.example, und Template-Repo-Struktur
./stacklink-smart.js --init

# Interaktive Prompts:
# ? GitHub Owner: your-username
# ? Repository Name: agi-shell-cms
# ? Branch: main
# ? Portainer URL: https://portainer.example.com/api
# ? Endpoint ID: 2
# ? Stack Name: agi-shell-cms-prod
```

**Erstellt automatisch:**
```
.
├── smart.config.json       # Hauptkonfiguration
├── .env.example            # Template für Secrets
└── deploy/
    ├── docker-compose.yml  # Example Compose-File
    └── .env               # Template (aus .env.example kopiert)
```

### 1.3 Secrets konfigurieren

```bash
# .env bearbeiten (wird automatisch geladen, kein export nötig):
nano .env

# Mindestens erforderlich:
GITHUB_TOKEN=ghp_your_token_here
PORTAINER_API_KEY=ptr_your_key_here
JWT_SECRET=your-jwt-secret-min-32-chars
POSTGRES_PASSWORD=your-postgres-password-min-16-chars

# Berechtigungen setzen:
chmod 600 .env
```

**NEU in v2.3:** `.env` wird automatisch geladen via `dotenv` - kein manuelles `export $(cat .env | xargs)` mehr nötig!

### 1.4 Erstes Deployment

```bash
# Dry-Run zum Testen:
./stacklink-smart.js --dry-run --verbose

# Live-Deployment:
./stacklink-smart.js --state states/first-deploy.json
```

**Das war's! Von Download bis Deployment in unter 5 Minuten.** 🚀

---

## 2. Systemdiagnose mit `--doctor` (NEU in v2.3)

**Vollständige Systemprüfung vor dem ersten Deployment.**

### 2.1 Diagnose ausführen

```bash
./stacklink-smart.js --doctor
```

**Ausgabe-Beispiel:**
```
=== S.M.A.R.T System Diagnostic v2.3 ===

[✓] Node.js: v20.11.0 (required: >=20.0.0)
[✓] Git: 2.43.0 (required: >=2.30.0)
[✓] Docker: 24.0.7 (required: >=24.0.0)
[✓] Docker Compose: v2.23.3 (required: >=2.20.0)
[✓] OpenSSH: 8.9p1 (required: >=8.0.0)
[✓] TLS: 1.3 available (required: >=1.2)

[✓] Docker daemon: Running
[✓] Docker socket: Accessible
[✓] Network connectivity: OK

[✓] GitHub API: Reachable
[✓] Portainer API: Reachable (https://portainer.example.com/api)
[✓] Portainer TLS: 1.3

[✓] SSH Key: ~/.ssh/id_ed25519 (permissions: 0600)
[✓] SSH Agent: Running

[✓] Disk space: 45.2 GB free
[✓] Memory: 7.8 GB free

=== All checks passed! System ready for deployment. ===
```

### 2.2 Diagnose-Ausgabe interpretieren

**[✓] Grün** - Alles OK  
**[⚠] Gelb** - Warnung, funktioniert aber  
**[✗] Rot** - Kritischer Fehler, muss behoben werden

### 2.3 Diagnose-Report speichern

```bash
# Als JSON für Automatisierung:
./stacklink-smart.js --doctor --log json > doctor-report.json

# Report analysieren:
jq '.checks[] | select(.status == "error")' doctor-report.json
```

---

## 3. GitHub Vorbereitung

### 3.1 Personal Access Token (PAT) erstellen

1. Gehe zu GitHub: **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Klicke auf **"Generate new token (classic)"**
3. Konfiguration:
   ```
   Note: S.M.A.R.T Installer v2.3
   Expiration: 90 days
   
   Scopes (minimal):
   ✅ repo (Full control of private repositories)
     oder
   ✅ public_repo (nur für öffentliche Repos)
   
   Optional:
   ✅ read:packages (für GHCR)
   ```
4. Token kopieren: `ghp_1A2b3C4d5E6f7G8h9I0jKlMnOpQrStUvWxYz`

**NEU in v2.3:** Automatische Token-Scope-Validierung mit Warnungen bei übermäßigen Berechtigungen.

### 3.2 SSH Deploy Key erstellen

```bash
# Ed25519 Key generieren:
ssh-keygen -t ed25519 -C "agi-deploy-v2.3" -f ~/.ssh/agi_deploy_v2.3

# Permissions setzen (v2.3 Requirement):
chmod 600 ~/.ssh/agi_deploy_v2.3
chmod 644 ~/.ssh/agi_deploy_v2.3.pub

# Public Key anzeigen:
cat ~/.ssh/agi_deploy_v2.3.pub
```

**In GitHub:**
1. Repository → **Settings** → **Deploy keys**
2. **"Add deploy key"**
3. Title: `S.M.A.R.T Deploy Key v2.3`
4. Key: [Public Key einfügen]
5. **Add key**

**NEU in v2.3:** SSH-Key-Permissions werden automatisch geprüft (muss 0600 sein).

### 3.3 Repository-Struktur

```bash
your-repo/
├── deploy/
│   ├── docker-compose.yml
│   └── docker-compose.swarm.yml  # Optional für Swarm
├── .env.example
└── README.md
```

---

## 4. Portainer Vorbereitung

### 4.1 API Key erstellen

1. Login in Portainer
2. **User settings** (Avatar oben rechts)
3. **"Access tokens"** → **"Add access token"**
4. Description: `S.M.A.R.T Installer v2.3`
5. Token kopieren: `ptr_1A2b3C4d5E6f7G8h9I0jKlMnOpQrStUvWxYz`

### 4.2 Endpoint ID ermitteln

```
URL: https://portainer.example.com/#!/2/docker/dashboard
                                       ↑
                                   Endpoint ID = 2
```

### 4.3 TLS-Validierung (v2.3)

```bash
# Portainer TLS-Version prüfen:
openssl s_client -connect portainer.example.com:443 -tls1_2 </dev/null 2>/dev/null | grep "Protocol"

# Sollte: TLSv1.2 oder TLSv1.3 zeigen
```

---

## 5. Docker Swarm Vorbereitung (Optional)

### 5.1 Swarm initialisieren

```bash
docker swarm init --advertise-addr $(hostname -I | awk '{print $1}')
```

### 5.2 Overlay-Netzwerk

```bash
docker network create --driver overlay --attachable agi_swarm_net
```

### 5.3 Health-Checks (NEU in v2.3)

```bash
# Swarm-Status prüfen:
./stacklink-smart.js --doctor | grep -A5 "Docker Swarm"

# Erwartete Ausgabe:
# [✓] Docker Swarm: Active (Manager)
# [✓] Swarm Nodes: 3 (1 manager, 2 workers)
# [✓] Swarm Networks: agi_swarm_net
```

---

## 6. Installer Installation

### 6.1 Download & Verifikation

```bash
cd /opt/agi-smart-installer

# Download v2.3:
curl -fsSL https://raw.githubusercontent.com/sebastian-huehn/agi-smart-installer/v2.3.0/stacklink-smart.js -o stacklink-smart.js

# SHA-256 Checksum:
curl -fsSL https://raw.githubusercontent.com/sebastian-huehn/agi-smart-installer/v2.3.0/stacklink-smart.js.sha256 -o stacklink-smart.js.sha256
sha256sum -c stacklink-smart.js.sha256

# Ausführbar machen:
chmod +x stacklink-smart.js
```

### 6.2 Self-Update (NEU in v2.3)

```bash
# Automatisches Update auf neueste Version:
./stacklink-smart.js --self-update

# Ausgabe:
# [INFO] Current version: 2.2.0
# [INFO] Latest version: 2.3.0
# [INFO] Downloading update...
# [OK] Updated to v2.3.0
# [OK] Please restart the installer
```

**Update-Check ohne Installation:**
```bash
./stacklink-smart.js --self-update --check-only
```

---

## 7. Konfiguration erstellen

### 7.1 Mit --init (Empfohlen)

```bash
# Interaktive Initialisierung:
./stacklink-smart.js --init
```

### 7.2 Manuelle Konfiguration

```bash
cat > smart.config.json << 'EOF'
{
  "version": "2.3",
  "github": {
    "owner": "your-github-username",
    "repo": "agi-shell-cms",
    "branch": "main",
    "token": "${GITHUB_TOKEN}"
  },
  "repo": {
    "url": "git@github.com:your-github-username/agi-shell-cms.git",
    "compose": "deploy/docker-compose.yml",
    "env": ".env",
    "env_required": ["POSTGRES_PASSWORD", "JWT_SECRET"],
    "workdir": "/opt/agi-shell-cms",
    "ssh": {
      "enabled": true,
      "private_key": "~/.ssh/agi_deploy_v2.3",
      "strict_host_key_checking": true
    }
  },
  "targets": [
    {
      "name": "production",
      "type": "portainer",
      "base_url": "https://portainer.example.com/api",
      "api_key": "${PORTAINER_API_KEY}",
      "endpoint_id": 2,
      "stack": "agi-shell-cms-prod",
      "update": true,
      "tls_verify": true
    }
  ],
  "health": {
    "services": ["agi_api", "agi_cms", "agi_caddy"],
    "http": [
      {"url": "http://localhost:8081/api/health", "expect": 200}
    ],
    "retries": 8,
    "backoff_ms": 2500,
    "timeout_ms": 30000
  },
  "parallel": true,
  "audit": {
    "enabled": true,
    "state_dir": "states",
    "include_operator": true,
    "include_ip": true
  }
}
EOF
```

**NEU in v2.3:**
- `"parallel": true` - Parallele Target-Deployments (Standard)
- `audit.include_operator` - Erfasst aktuellen User
- `audit.include_ip` - Erfasst Server-IP
- `health.timeout_ms` - Globaler Timeout (30s Standard)

### 7.3 Config mit --set überschreiben (NEU in v2.3)

```bash
# Einzelne Werte direkt überschreiben ohne JSON-Edit:
./stacklink-smart.js --set targets[0].stack=agi-prod-v2

# Mehrere Werte:
./stacklink-smart.js \
  --set targets[0].stack=new-stack \
  --set health.retries=12 \
  --set parallel=false

# Array-Index-Syntax:
./stacklink-smart.js --set targets[1].endpoint_id=3
```

### 7.4 Schema-Validierung (NEU in v2.3)

```bash
# Automatische Validierung mit ajv:
./stacklink-smart.js --validate-only

# Ausgabe bei Fehler:
# [ERROR] Config validation failed:
#   - targets[0].base_url: must be valid URL
#   - health.retries: must be number (got string)
```

---

## 8. Erstes Deployment (Dry-Run)

### 8.1 Systemcheck

```bash
# Vollständige Diagnose:
./stacklink-smart.js --doctor
```

### 8.2 Dry-Run

```bash
# Simulation ohne Änderungen:
./stacklink-smart.js --dry-run --verbose

# Mit JSON-Logging:
./stacklink-smart.js --dry-run --log json > dry-run.log
```

**NEU in v2.3:** Automatische `.env`-Datei-Erkennung - kein manuelles `export` mehr nötig!

---

## 9. Live Deployment

### 9.1 Produktives Deployment

```bash
# Mit State-File:
./stacklink-smart.js --state states/deploy-$(date +%Y%m%d-%H%M%S).json

# Oder mit Auto-State (verwendet Timestamp):
./stacklink-smart.js
```

**Erwartete Ausgabe (v2.3):**
```
[INFO] S.M.A.R.T Installer v2.3.0 gestartet
[INFO] Loading .env automatically...
[OK] Environment loaded: 4 variables
[INFO] Schema validation passed
[INFO] GitHub Token Scopes: repo ✓
[INFO] Deploying to 1 target(s) in parallel mode...
[INFO] Target 1/1: production (portainer)
[OK] Stack deployed: agi-shell-cms-prod (id=42)
[INFO] Health checks: 2/2 consecutive successes
[OK] ✓ Deployment successful (duration: 8.4s)
```

### 9.2 State-File prüfen

```bash
cat states/latest.json | jq '.'
```

**NEU in v2.3 State-Format:**
```json
{
  "schema_version": "2.3",
  "installer_version": "2.3.0",
  "run_id": "20251109-143052-a1b2c3",
  "started_at": "2025-11-09T14:30:52.123Z",
  "completed_at": "2025-11-09T14:30:60.567Z",
  "duration_ms": 8444,
  "ok": true,
  "commit": "abc1234567890",
  "targets": [
    {
      "name": "production",
      "type": "portainer",
      "ok": true,
      "duration_ms": 7234
    }
  ],
  "audit": {
    "operator": "root",
    "hostname": "prod-server-01",
    "ip_address": "203.0.113.42"
  }
}
```

---

## 10. Multi-Target & Parallel Deployments (NEU in v2.3)

### 10.1 Parallele Deployments (Standard)

**NEU in v2.3:** Alle Targets werden parallel deployed für maximale Geschwindigkeit.

```bash
# Parallel (Standard):
./stacklink-smart.js

# Ausgabe:
# [INFO] Deploying to 3 targets in parallel mode...
# [INFO] Target 1/3: production (portainer) - Started
# [INFO] Target 2/3: staging (portainer) - Started
# [INFO] Target 3/3: development (local) - Started
# [OK] Target 1/3: production - Completed (8.2s)
# [OK] Target 2/3: staging - Completed (7.9s)
# [OK] Target 3/3: development - Completed (6.1s)
# [OK] All targets deployed successfully (8.2s total)
```

**Fehler-Isolierung:** Ein fehlgeschlagener Target stoppt nicht die anderen!

### 10.2 Sequentielles Deployment

```bash
# Nacheinander (falls gewünscht):
./stacklink-smart.js --set parallel=false

# Oder in Config:
{
  "parallel": false,
  "targets": [...]
}
```

### 10.3 Selektive Deployments

```bash
# Nur bestimmte Targets:
./stacklink-smart.js --targets "production,staging"

# Einzelnes Target:
./stacklink-smart.js --targets "production"
```

### 10.4 Multi-Environment Config

```json
{
  "targets": [
    {
      "name": "production",
      "type": "portainer",
      "base_url": "https://portainer-prod.example.com/api",
      "api_key": "${PORTAINER_API_KEY_PROD}",
      "endpoint_id": 1,
      "stack": "agi-prod"
    },
    {
      "name": "staging",
      "type": "portainer",
      "base_url": "https://portainer-staging.example.com/api",
      "api_key": "${PORTAINER_API_KEY_STAGING}",
      "endpoint_id": 2,
      "stack": "agi-staging"
    },
    {
      "name": "swarm-cluster",
      "type": "swarm",
      "manager_url": "tcp://swarm-manager.example.com:2376",
      "stack": "agi-swarm",
      "tls_cert": "/certs/swarm-client.pem"
    }
  ],
  "parallel": true
}
```

---

## 11. Rollback-Strategien

### 11.1 Vollständiger Rollback (NEU in v2.3)

```bash
# Rollback auf vorherigen State:
./stacklink-smart.js --rollback-to states/last-known-good.json

# Ausgabe:
# [INFO] Rollback initiated to state from 2025-11-08T14:30:00Z
# [INFO] Target commit: abc1234
# [INFO] Checking out commit abc1234...
# [OK] Repository reset to abc1234
# [INFO] Redeploying services...
# [OK] Rollback completed successfully (duration: 12.3s)
```

**Was passiert:**
1. Liest Commit-Hash aus State-File
2. Checked Repository zu diesem Commit aus
3. Führt erneutes Deployment durch
4. Validiert Health-Checks

### 11.2 Automatischer Rollback bei Fehler

```bash
cat > deploy-with-auto-rollback.sh << 'EOF'
#!/bin/bash
set -euo pipefail

LAST_GOOD="states/last-known-good.json"

# Backup current state
if [ -f "states/current.json" ]; then
  cp states/current.json "$LAST_GOOD"
fi

# Try deployment
if ! ./stacklink-smart.js --state states/current.json; then
  echo "[ERROR] Deployment failed! Initiating automatic rollback..."
  ./stacklink-smart.js --rollback-to "$LAST_GOOD"
  exit 1
fi

echo "[OK] Deployment successful"
EOF

chmod +x deploy-with-auto-rollback.sh
```

### 11.3 Blue-Green Deployment

```bash
# Deploy zu inaktivem Environment:
./stacklink-smart.js --targets "green" --state states/green-$(date +%Y%m%d).json

# Health-Check vor Switch:
./stacklink-smart.js --verify-only --targets "green"

# Traffic Switch (manuell oder automatisiert):
# ... Load Balancer Update ...

# Altes Environment deaktivieren:
docker compose -f /opt/agi-shell-cms-blue/deploy/docker-compose.yml down
```

---

## 12. Webhook-Server (NEU in v2.3)

**Instant-Deployments bei GitHub Push-Events!**

### 12.1 Webhook-Server starten

```bash
# Webhook-Server auf Port 3000:
./stacklink-smart.js --webhook

# Ausgabe:
# [INFO] Webhook server starting on port 3000...
# [INFO] HMAC-SHA256 validation enabled
# [OK] Webhook server listening on http://0.0.0.0:3000/webhook
```

**Konfiguration:**
```bash
# In .env:
WEBHOOK_SECRET=your-webhook-secret-min-32-chars
WEBHOOK_PORT=3000  # Optional, Standard: 3000
```

### 12.2 Als Systemd Service

```bash
sudo cat > /etc/systemd/system/agi-webhook.service << 'EOF'
[Unit]
Description=AGI S.M.A.R.T Webhook Server v2.3
After=network.target docker.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/agi-smart-installer
ExecStart=/opt/agi-smart-installer/stacklink-smart.js --webhook
Restart=on-failure
RestartSec=10s

# Security
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ReadWritePaths=/opt/agi-smart-installer/states /opt/agi-smart-installer/logs

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable agi-webhook
sudo systemctl start agi-webhook

# Status:
sudo systemctl status agi-webhook
```

### 12.3 GitHub Webhook konfigurieren

1. Repository → **Settings** → **Webhooks** → **Add webhook**
2. **Payload URL:** `https://your-server.com/webhook` (via Reverse Proxy)
3. **Content type:** `application/json`
4. **Secret:** `your-webhook-secret-min-32-chars` (aus .env)
5. **Events:** Just the `push` event
6. **Active:** ✅

### 12.4 Webhook testen

```bash
# Test-Payload:
PAYLOAD='{"ref":"refs/heads/main","repository":{"name":"agi-shell-cms"}}'
SECRET="your-webhook-secret-min-32-chars"

# Signature berechnen:
SIGNATURE=$(echo -n "$PAYLOAD" | openssl dgst -sha256 -hmac "$SECRET" | sed 's/^.* //')

# Request senden:
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -H "X-Hub-Signature-256: sha256=$SIGNATURE" \
  -d "$PAYLOAD"

# Erwartete Antwort:
# {"ok":true,"message":"Deployment triggered","timestamp":"2025-11-09T14:30:00.000Z"}
```

### 12.5 Nginx Reverse Proxy

```nginx
server {
    listen 443 ssl http2;
    server_name deploy.example.com;

    ssl_certificate /etc/letsencrypt/live/deploy.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/deploy.example.com/privkey.pem;

    location /webhook {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Webhook timeout
        proxy_read_timeout 120s;
    }
}
```

---

## 13. Monitoring & Metrics

### 13.1 Prometheus Metrics (NEU in v2.3)

**Eingebauter Metrics-Endpoint auf Port 9090!**

```bash
# Metrics-Server starten (parallel zu Webhook):
./stacklink-smart.js --webhook --metrics

# Oder nur Metrics:
./stacklink-smart.js --metrics

# Ausgabe:
# [INFO] Metrics server listening on http://0.0.0.0:9090/metrics
```

**Verfügbare Metrics:**
```
# HELP smart_deploy_success Deployment success (1=success, 0=failure)
# TYPE smart_deploy_success gauge
smart_deploy_success{version="2.3.0",target="production"} 1

# HELP smart_deploy_duration_ms Deployment duration in milliseconds
# TYPE smart_deploy_duration_ms gauge
smart_deploy_duration_ms{version="2.3.0",target="production"} 8444

# HELP smart_deploy_timestamp Last deployment timestamp (Unix epoch)
# TYPE smart_deploy_timestamp gauge
smart_deploy_timestamp{version="2.3.0"} 1731163852

# HELP smart_health_check_passed Health check status (1=passed, 0=failed)
# TYPE smart_health_check_passed gauge
smart_health_check_passed{version="2.3.0",target="production"} 1

# HELP smart_targets_total Total number of deployment targets
# TYPE smart_targets_total gauge
smart_targets_total{version="2.3.0"} 3

# HELP smart_targets_successful Number of successful targets
# TYPE smart_targets_successful gauge
smart_targets_successful{version="2.3.0"} 3
```

### 13.2 Prometheus Scrape Config

```yaml
# /etc/prometheus/prometheus.yml
scrape_configs:
  - job_name: 'agi-smart-installer'
    static_configs:
      - targets: ['localhost:9090']
    scrape_interval: 30s
```

### 13.3 Grafana Dashboard

**Import Dashboard JSON:**
```bash
curl -X POST http://admin:admin@localhost:3000/api/dashboards/db \
  -H "Content-Type: application/json" \
  -d '{
    "dashboard": {
      "title": "AGI S.M.A.R.T v2.3",
      "panels": [
        {
          "title": "Deployment Success Rate",
          "targets": [{"expr": "smart_deploy_success"}]
        },
        {
          "title": "Deployment Duration",
          "targets": [{"expr": "smart_deploy_duration_ms / 1000"}]
        },
        {
          "title": "Last Deployment",
          "targets": [{"expr": "time() - smart_deploy_timestamp"}]
        }
      ]
    }
  }'
```

### 13.4 Alert Rules

```yaml
# /etc/prometheus/rules/agi-smart.yml
groups:
  - name: agi_smart_v23
    rules:
      - alert: DeploymentFailed
        expr: smart_deploy_success == 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Deployment failed"
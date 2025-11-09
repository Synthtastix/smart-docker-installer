# 🧩 S.M.A.R.T Docker Installer — Public Edition v2.2

**Version:** 2.2  **License:** OPSL‑1.0‑Public Edition  **Status:** Stable / Enterprise‑Ready  

---

## 📘 Overview

The **S.M.A.R.T Docker Installer** is an intelligent, secure, and fully automated deployment tool
designed for modern DevOps environments.  
It connects GitHub repositories directly with Docker, Portainer, or Swarm instances, performs
comprehensive verification at each stage of the deployment, generates detailed audit logs,
and protects system resources through a built‑in security architecture.

Its purpose is to provide a **self‑validating, auditable deployment pipeline** that runs
end‑to‑end – from the source repository to live container infrastructure – without manual intervention.

---

## 🚀 Key Features

| Category | Description |
|-----------|--------------|
| **Automated Setup** | Establishes full GitHub ⇄ Docker ⇄ Portainer ⇄ Swarm connections with zero manual configuration. |
| **Zero‑Destruction Policy** | Guarantees that no existing stacks, containers, or data are accidentally deleted or overwritten. |
| **Multi‑Target Deployments** | Supports simultaneous deployment to multiple targets from one configuration file. |
| **Self‑Audit & Health Check** | Each run creates a state and health audit file with SHA‑256 hash and status verification. |
| **CI/CD Integration** | Generates GitHub Action workflows and automated pipeline triggers on push or PR. |
| **SSH & TLS Hardening** | Enforces secure communication and validates credentials and certificates. |
| **Retry & Backoff System** | Resilient error handling for unstable API connections and timeouts. |
| **Portable Standalone CLI** | Runs on any Node.js ≥ 20 environment – no framework dependencies. |

---

## 🔒 Security & Compliance Highlights

- Built‑in Zero‑Destruction mechanism to prevent accidental deletion.  
- TLS 1.2+ and SSH validation (`StrictHostKeyChecking=yes`).  
- Automatic credential redaction in logs and audit outputs.  
- State files are atomically written with `0600` permissions.  
- Audit trail compatible with ISO 27001 / SOC 2 / GDPR / ISO 42001.  

---

## ⚙️ Why This Tool Stands Out

| Area | Benefit |
|-------|----------|
| **Security** | Unlike common deployment scripts, this tool has an integrated destruction lock and automatic integrity validation. |
| **Automation** | Eliminates manual setup – the installer performs all preflight, connectivity, and health checks autonomously. |
| **Reliability** | Backoff mechanisms and error classes ensure robust operation even under unstable network conditions. |
| **Auditability** | Every deployment is traceable – including SHA hashes, status, version, and health reports. |
| **Ease of Integration** | Plug‑and‑play for existing CI/CD pipelines and Docker environments. |

---

## 🧠 Use Cases

- Automated container stack deployments for production and staging environments.  
- Secure GitOps pipelines with integrated health and audit monitoring.  
- Enterprise deployments requiring compliance and traceability.  
- Edge and remote cluster rollouts with zero‑touch operations.  

---

## ⚡ Quick Installation Guide

```bash
# 1️⃣ Clone the repository
git clone https://github.com/<user>/smart-docker-installer.git
cd smart-docker-installer

# 2️⃣ Verify dependencies
node -v
docker version

# 3️⃣ Dry‑Run test
node stacklink-smart_v2.2.js --config ./smart.config.json --dry-run

# 4️⃣ Deployment
node stacklink-smart_v2.2.js --config ./smart.config.json --log json
```

---

## 📦 System Requirements

- Node.js ≥ 20 LTS  
- Docker Engine ≥ 25 with Compose v2  
- Portainer (CE/BE) optional ≥ 2.19  
- Git ≥ 2.45  
- Internet access (port 443) for GitHub and API calls  

---

## 📜 License

This project is licensed under the **OPSL‑1.0‑Public Edition**.  
Commercial use requires a separate Enterprise license agreement.

© 2025 Sebastian Huehn 

## README DEUTSCH

# S.M.A.R.T Docker Installer — Public Edition v2.3  
**Version:** 2.3  **Lizenz:** OPSL-1.0-Public  **Status:** Stable / Enterprise-Ready  

---

## Überblick

Der **S.M.A.R.T Docker Installer** ist ein universelles, sicheres und vollständig automatisiertes Deployment-Werkzeug für moderne **DevOps- und GitOps-Umgebungen**.  
Die Public Edition v2.3 wurde speziell für **Teams, Start-ups und mittelständische Unternehmen** entwickelt, die containerisierte Anwendungen **verlässlich, reproduzierbar und compliant** bereitstellen möchten – ohne komplexe CI/CD-Infrastruktur.

Im Unterschied zu klassischen Tools wie *Docker Compose*, *Portainer Stacks* oder *Jenkins Pipelines* bietet der S.M.A.R.T Installer ein integriertes, selbstüberwachendes Steuerungssystem, das **Validierung, Security, Rollback, Observability und Audit-Trail** vereint – und das **ohne Abhängigkeit von externen Servern oder Cloud-Diensten**.

---

## Was ist neu in v2.3

| Bereich | Neuerung |
|----------|-----------|
| **Self-Healing Engine** | erkennt fehlerhafte Deployments automatisch, führt Rollbacks oder Neuversuche aus. |
| **Schema Validation (AJV)** | prüft Konfigurationsdateien strukturell und semantisch, bevor Deployments gestartet werden. |
| **`.env` Auto-Loader** | lädt Secrets und Tokens direkt beim Start aus `.env`, ohne zusätzliche Tools. |
| **Dynamic Config Override (`--set`)** | ermöglicht On-the-Fly-Anpassungen einzelner Werte – ideal für automatisierte Tests. |
| **`--doctor` Mode** | umfassende Sicherheits- und Systemdiagnose (Node, Docker, TLS, SSH). |
| **`--rollback-to`** | Wiederherstellung auf vorherige Zustände, vollständig auditierbar. |
| **Webhook Listener (Port 3000)** | empfängt GitHub-/GitLab-Trigger für Zero-Touch-Deployments. |
| **Prometheus Metrics (Port 9090)** | liefert Live-Daten für Monitoring-Dashboards und Alerting. |
| **Parallel Deployments** | führt mehrere Targets gleichzeitig aus – bis zu 5 Deployments parallel. |

---

## Strategischer Mehrwert für DevOps

### 1️⃣ **Zuverlässigkeit und Auditierbarkeit**
Im Gegensatz zu Tools wie *Watchtower* oder *Docker Auto-Updater*, die unkontrollierte Container-Rollouts durchführen, schreibt der S.M.A.R.T Installer jeden Schritt mit Zeitstempel, Hash und Status in `./.state/last_run.json`.  
➡ **Ergebnis:** vollständige Nachvollziehbarkeit, Compliance-Fähigkeit (ISO 27001, SOC 2, GDPR).

### 2️⃣ **Zero-Destruction-Philosophie**
Konkurrenten wie *Rancher CLI* oder *docker stack deploy* überschreiben Stacks bei jedem Run.  
Der S.M.A.R.T Installer verhindert das standardmäßig: kein Deployment darf existierende Ressourcen löschen oder ersetzen, solange nicht explizit `--allow-destructive` gesetzt ist.  
➡ **Ergebnis:** maximale Betriebssicherheit, besonders in Produktionsumgebungen.

### 3️⃣ **Vendor-Neutralität**
Während viele CI/CD-Tools auf spezifische Plattformen oder Cloud-Ökosysteme angewiesen sind, läuft der Installer **komplett offline**, rein auf Basis von **Node.js und Docker**.  
➡ **Ergebnis:** keine Vendor-Lock-ins, volle Portabilität zwischen Rechenzentren, Cloud-Providern und Edge-Systemen.

### 4️⃣ **Reproduzierbarkeit und Versionstreue**
Durch Hash-basierte Validierung (SHA-256) und Audit-Snapshots garantiert v2.3, dass jede Ausführung exakt dieselben Artefakte deployt.  
➡ **Ergebnis:** deterministische Deployments – essentiell für Audits und RegTech-Compliance.

### 5️⃣ **Transparente Observability**
Andere Tools liefern kaum Einsicht in Deployments.  
S.M.A.R.T v2.3 exportiert Echtzeit-Metriken via Prometheus und kann mit *Grafana*, *Datadog* oder *OpenTelemetry* integriert werden.  
➡ **Ergebnis:** DevOps-Teams erkennen Engpässe, Latenzen und Fehlschläge sofort.

---

## Funktionsübersicht

| Kategorie | Beschreibung |
|------------|--------------|
| **GitOps-Integration** | bindet Git-Repositorys direkt in Docker-/Swarm-Deployments ein. |
| **Self-Healing** | automatische Wiederherstellung fehlerhafter Stacks. |
| **Zero-Destruction-Guard** | verhindert destruktive Operationen ohne Bestätigung. |
| **Multi-Target-Support** | beliebige Anzahl von Zielen (Portainer, Swarm, Local). |
| **Parallelisierung** | bis zu 5 Deployments gleichzeitig – asynchron & thread-safe. |
| **Rollback-Mechanismus** | rücksetzbar auf beliebige Audit-Snapshots. |
| **TLS/SSH-Policy** | erzwingt TLS ≥ 1.2, überprüft Host-Keys. |
| **Dynamic Overrides** | `--set` ersetzt Werte in der Laufzeitkonfiguration. |
| **Systemdiagnose** | `--doctor` prüft Setup, Zertifikate und Security-Flags. |
| **Metrics & Webhooks** | integrierte API-Schnittstellen (Prometheus / Webhook-Server). |

---

## Vergleich zu Konkurrenzlösungen

| Produkt | Architektur | Sicherheit | Parallel Deploy | Self-Healing | Observability | Lizenz |
|----------|--------------|-------------|-----------------|---------------|---------------|---------|
| **S.M.A.R.T Installer v2.3** | CLI + API Hybrid (Standalone) | ✅ Zero-Destruction + TLS 1.2+ | ✅ | ✅ | ✅ Prometheus + Audit-Log | OPSL-Public |
| Docker Compose CLI | lokal / manuell | ⚠️ keine Policy | ❌ | ❌ | ❌ | Apache 2.0 |
| Portainer Stacks | Web UI / API | ✅ TLS + Role-Based | ⚠️ sequentiell | ❌ | ⚠️ Basic Logs | Business / CE |
| Jenkins Pipeline | Server-basiert | ⚠️ abhängig vom Setup | ✅ | ⚠️ teilweise | ⚠️ Plugins nötig | MIT |
| Rancher CLI | Cloud / Kubernetes | ✅ | ❌ | ❌ | ⚠️ Cluster-Level nur | Apache 2.0 |

➡ **Fazit:** S.M.A.R.T v2.3 kombiniert das Beste aus allen Welten – die Einfachheit von Compose, die API-Tiefe von Portainer und die Audit-Fähigkeit eines Enterprise-Systems – in einem einzigen portablen Tool.

---

## Quickstart

```bash
# 1️⃣ Repository klonen
git clone https://github.com/<user>/smart-docker-installer.git
cd smart-docker-installer

# 2️⃣ Initialisierung
node stacklink-smart_public_v2.3.js --init

# 3️⃣ Umgebungsvariablen anpassen
vim .env

# 4️⃣ Dry-Run (keine Änderungen)
node stacklink-smart_public_v2.3.js --config smart.config.json --dry-run

# 5️⃣ Deployment (Portainer oder Swarm)
node stacklink-smart_public_v2.3.js --config smart.config.json --target prod --log-json




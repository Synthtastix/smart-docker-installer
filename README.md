# 🧩 S.M.A.R.T Docker Installer — Public Edition v2.3  
**Version:** 2.3  **License:** OPSL-1.0-Public  **Status:** Stable / Enterprise-Ready  

---

## 🌐 Overview

The **S.M.A.R.T Docker Installer** is a universal, secure, and fully automated deployment solution for modern **DevOps** and **GitOps** environments.  
Public Edition v2.3 is designed for **teams, start-ups, and enterprises** that need containerized workloads deployed **reliably, reproducibly, and with built-in compliance** — without depending on heavy CI/CD infrastructure.

Unlike traditional tools such as *Docker Compose*, *Portainer Stacks*, or *Jenkins Pipelines*, the S.M.A.R.T Installer introduces a self-governing control layer that combines **validation, security, rollback, observability, and auditing** in a single portable binary.  
It runs entirely offline, requires no agents or servers, and enforces strong operational safety policies by default.

---

## 🚀 What’s New in v2.3

| Category | Description |
|-----------|-------------|
| **Self-Healing Engine** | Automatically detects failed deployments and performs recovery or rollback. |
| **Schema Validation (AJV)** | Built-in JSON schema validation ensures configuration integrity before execution. |
| **`.env` Auto-Loader** | Securely loads environment variables from `.env` at runtime. |
| **Dynamic Overrides (`--set`)** | Modify configuration values on-the-fly — ideal for testing and CI pipelines. |
| **`--doctor` Mode** | Performs comprehensive system and security diagnostics (Node, Docker, TLS, SSH). |
| **`--rollback-to`** | Restores previous deployment states from audit history. |
| **Webhook Listener (Port 3000)** | Receives GitHub/GitLab webhooks for zero-touch deployments. |
| **Prometheus Metrics (Port 9090)** | Exposes live runtime and health metrics for monitoring dashboards. |
| **Parallel Deployments** | Executes multiple deployment targets simultaneously (up to 5). |

---

## 💡 Strategic Value for DevOps Teams

### 1️⃣ **Reliability & Full Auditability**
Unlike *Watchtower* or *Docker Auto-Updater*, which perform untracked rollouts,  
the S.M.A.R.T Installer writes every step — including timestamps, hash, and exit status — to `./.state/last_run.json`.  
➡ **Result:** full traceability and compliance alignment (ISO 27001 / SOC 2 / GDPR).

### 2️⃣ **Zero-Destruction Policy**
Tools like *Rancher CLI* or `docker stack deploy` overwrite existing stacks every time.  
S.M.A.R.T prevents this by default — no resource is modified or deleted unless explicitly permitted via `--allow-destructive`.  
➡ **Result:** unmatched safety for production environments.

### 3️⃣ **Vendor-Neutral and Offline-Capable**
While many CI/CD frameworks are tied to cloud ecosystems, S.M.A.R.T runs **completely standalone**, based only on **Node.js and Docker**.  
➡ **Result:** no vendor lock-ins, no cloud dependencies, portable across data centers and edge devices.

### 4️⃣ **Reproducibility & Version Integrity**
Each execution is verified via SHA-256 hashing and stored with audit metadata.  
➡ **Result:** deterministic deployments — essential for audits, compliance, and DevSecOps maturity.

### 5️⃣ **Transparent Observability**
Where others provide limited logs, S.M.A.R.T v2.3 exports **real-time Prometheus metrics** compatible with Grafana, Datadog, or OpenTelemetry.  
➡ **Result:** clear visibility into deployment timing, success rates, and operational health.

---

## ⚙️ Core Capabilities

| Category | Description |
|-----------|-------------|
| **GitOps Integration** | Connects Git repositories directly to Docker/Swarm targets. |
| **Self-Healing Logic** | Automatically retries or rolls back failing deployments. |
| **Zero-Destruction Guard** | Prevents destructive actions without explicit confirmation. |
| **Multi-Target Deployments** | Supports unlimited targets (Portainer, Swarm, Local). |
| **Parallel Execution** | Up to 5 concurrent deployments — fully thread-safe. |
| **Rollback System** | Revert to any previous state file instantly. |
| **TLS/SSH Enforcement** | Enforces TLS ≥ 1.2 and strict host key checking. |
| **Dynamic Config Overrides** | Adjust runtime values using `--set key=value`. |
| **System Diagnostics** | `--doctor` checks versions, security, and connectivity. |
| **Metrics & Webhooks** | Exposes internal metrics (9090) and webhook listener (3000). |

---

## 🧩 Competitive Landscape

| Product | Architecture | Security | Parallel Deploy | Self-Healing | Observability | License |
|----------|--------------|-----------|-----------------|---------------|---------------|---------|
| **S.M.A.R.T Installer v2.3** | CLI + API Hybrid (Standalone) | ✅ Zero-Destruction + TLS 1.2+ | ✅ | ✅ | ✅ Prometheus + Audit Logs | OPSL-Public |
| Docker Compose CLI | Local Manual | ⚠️ No Policy Enforcement | ❌ | ❌ | ❌ | Apache 2.0 |
| Portainer Stacks | Web UI / API | ✅ TLS + RBAC | ⚠️ Sequential | ❌ | ⚠️ Basic Logs | Business / CE |
| Jenkins Pipelines | Server-based | ⚠️ Config-dependent | ✅ | ⚠️ Partial | ⚠️ Plugins needed | MIT |
| Rancher CLI | Cloud / Kubernetes | ✅ | ❌ | ❌ | ⚠️ Cluster Level Only | Apache 2.0 |

➡ **Conclusion:**  
S.M.A.R.T v2.3 unifies the simplicity of Docker Compose, the manageability of Portainer, and the audit resilience of enterprise systems — without the complexity or vendor dependency.

---

## ⚡ Quickstart

```bash
# 1️⃣ Clone the repository
git clone https://github.com/<user>/smart-docker-installer.git
cd smart-docker-installer

# 2️⃣ Initialize configuration
node stacklink-smart_public_v2.3.js --init

# 3️⃣ Edit your .env
vim .env

# 4️⃣ Run a dry-run (no changes)
node stacklink-smart_public_v2.3.js --config smart.config.json --dry-run

# 5️⃣ Deploy (Portainer or Swarm)
node stacklink-smart_public_v2.3.js --config smart.config.json --target prod --log-json

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


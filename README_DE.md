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

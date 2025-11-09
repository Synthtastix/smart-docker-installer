# S.M.A.R.T Docker Installer — Public Edition v2.2

**Version:** 2.2  **License:** OPSL‑1.0‑Public Edition  **Status:** Stable / Enterprise‑Ready | Update 09-11-2025 

---

## Overview

The **S.M.A.R.T Docker Installer** is an intelligent, secure, and fully automated deployment tool
designed for modern DevOps environments. It connects GitHub repositories directly with Docker, Portainer, or Swarm instances, performs
comprehensive verification at each stage of the deployment, generates detailed audit logs, and protects system resources through a built‑in security architecture.

Its purpose is to provide a **self‑validating, auditable deployment pipeline** that runs
end‑to‑end – from the source repository to live container infrastructure – without manual intervention.

---

## Key Features

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

## Security & Compliance Highlights

- Built‑in Zero‑Destruction mechanism to prevent accidental deletion.  
- TLS 1.2+ and SSH validation (`StrictHostKeyChecking=yes`).  
- Automatic credential redaction in logs and audit outputs.  
- State files are atomically written with `0600` permissions.  
- Audit trail compatible with ISO 27001 / SOC 2 / GDPR / ISO 42001.  

---

## Why This Tool Stands Out

| Area | Benefit |
|-------|----------|
| **Security** | Unlike common deployment scripts, this tool has an integrated destruction lock and automatic integrity validation. |
| **Automation** | Eliminates manual setup – the installer performs all preflight, connectivity, and health checks autonomously. |
| **Reliability** | Backoff mechanisms and error classes ensure robust operation even under unstable network conditions. |
| **Auditability** | Every deployment is traceable – including SHA hashes, status, version, and health reports. |
| **Ease of Integration** | Plug‑and‑play for existing CI/CD pipelines and Docker environments. |

---

## Use Cases

- Automated container stack deployments for production and staging environments.  
- Secure GitOps pipelines with integrated health and audit monitoring.  
- Enterprise deployments requiring compliance and traceability.  
- Edge and remote cluster rollouts with zero‑touch operations.  

---

## Quick Installation Guide

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

## System Requirements

- Node.js ≥ 20 LTS  
- Docker Engine ≥ 25 with Compose v2  
- Portainer (CE/BE) optional ≥ 2.19  
- Git ≥ 2.45  
- Internet access (port 443) for GitHub and API calls  

---

## License

This project is licensed under the **OPSL‑1.0‑Public Edition**.  
Commercial use requires a separate Enterprise license agreement.

© 2025 Sebastian Huehn  





# **README DEUTSCH**

# S.M.A.R.T Docker Installer — Public Edition v2.2

**Version:** 2.2  **Lizenz:** OPSL‑1.0‑Public Edition  **Status:** Stable / Enterprise‑Ready  

---

## Überblick

Der **S.M.A.R.T Docker Installer** ist ein intelligentes, sicheres und vollständig automatisiertes Installations‑ und Deployment‑Tool für moderne DevOps‑Umgebungen. Er verbindet GitHub‑Repositorys direkt mit Docker‑, Portainer‑ oder Swarm‑Instanzen, überprüft jeden Schritt des Deployments, erstellt automatisch Audit‑Protokolle und schützt Infrastruktur‑Ressourcen durch eine integrierte Sicherheitsarchitektur.

Ziel ist eine **vollständig selbstvalidierende und auditierbare Bereitstellungspipeline**, die ohne manuelle Eingriffe auskommt – von der Codebasis bis zur laufenden Container‑Umgebung.

---

## Hauptfunktionen

| Kategorie | Beschreibung |
|------------|---------------|
| **Automatisches Setup** | Erstellt und verknüpft GitHub ⇄ Docker ⇄ Portainer ⇄ Swarm‑Umgebungen ohne manuelle Konfiguration. |
| **Zero‑Destruction‑Policy** | Garantiert, dass bestehende Stacks, Container oder Daten nicht versehentlich gelöscht werden. |
| **Multi‑Target‑Deployments** | Gleichzeitige Bereitstellung auf mehreren Zielsystemen über eine zentrale Konfigurationsdatei. |
| **Self‑Audit & Health‑Check** | Jeder Lauf erzeugt ein State‑ und Health‑Audit‑File mit SHA‑256 Hash und Statusbewertung. |
| **CI/CD‑Integration** | Automatische Generierung von GitHub Action Workflows und Pipeline‑Events. |
| **SSH & TLS Hardening** | Erzwingt sichere Verbindungen und validiert Authentizität und Zertifikate. |
| **Retry & Backoff‑System** | Resilientes Fehler‑ und Timeout‑Handling bei API‑Verbindungen. |
| **Portable Standalone‑CLI** | Läuft auf jedem System mit Node.js ≥ 20 – keine Abhängigkeit von Frameworks. |

---

## Sicherheits‑ und Compliance‑Merkmale

- Zero‑Destruction‑Mechanismus gegen versehentliche Löschung.  
- TLS 1.2+ und SSH Validierung (`StrictHostKeyChecking=yes`).  
- Credential‑Redaktion in Logs und Audit‑Dateien.  
- State‑Files werden atomar mit Berechtigung `0600` geschrieben.  
- Audit‑Trail kompatibel mit ISO 27001 / SOC 2 / GDPR / ISO 42001.  

---

## Warum dieses Tool besonders ist

| Bereich | Vorteil |
|----------|----------|
| **Sicherheit** | Im Gegensatz zu klassischen Deploy‑Skripten besitzt dieses Tool eine eingebaute Destruktionssperre und automatische Integritätsprüfung. |
| **Automatisierung** | Kein manuelles Setup mehr nötig – das Tool führt alle Preflight‑, Verbindungs‑ und Health‑Checks selbständig aus. |
| **Zuverlässigkeit** | Durch Backoff‑Mechanismen und Fehlerklassen läuft das System auch unter instabilen Netzbedingungen robust. |
| **Auditierbarkeit** | Jedes Deployment ist nachvollziehbar – inklusive SHA‑Hashes, Status, Version und Health Report. |
| **Einfache Integration** | Plug‑and‑Play für bestehende CI/CD‑Pipelines und jede Docker‑Umgebung. |

---

## Einsatzszenarien

- Automatisierte Bereitstellung von Container‑Stacks in Produktions‑ und Staging‑Umgebungen.  
- Sichere GitOps‑Pipelines mit integriertem Health‑Monitoring.  
- Enterprise‑Umgebungen mit Compliance‑Anforderungen.  
- Edge‑Deployments und Remote‑Cluster‑Rollouts.  

---

## Installation (Kurzüberblick)

```bash
# 1️⃣ Repository klonen
git clone https://github.com/<user>/smart-docker-installer.git
cd smart-docker-installer

# 2️⃣ Abhängigkeiten prüfen
node -v
docker version

# 3️⃣ Testlauf
node stacklink-smart_v2.2.js --config ./smart.config.json --dry-run

# 4️⃣ Deployment
node stacklink-smart_v2.2.js --config ./smart.config.json --log json
```

---

## Systemvoraussetzungen

- Node.js ≥ 20 LTS  
- Docker Engine ≥ 25 mit Compose v2  
- Portainer (CE/BE) optional ≥ 2.19  
- Git ≥ 2.45  
- Zugriff auf GitHub und Internet (Port 443)  

---

## Lizenz

Dieses Projekt steht unter der **OPSL‑1.0‑Public Edition**.  
Kommerzielle Verwendung erfordert eine separate Enterprise‑Lizenz.

© 2025 Sebastian Huehn




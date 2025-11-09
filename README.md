# S.M.A.R.T Docker Installer — Public Edition v2.3  
**Version:** 2.3  **License:** OPSL-1.0-Public  **Status:** Stable / Enterprise-Ready  

---

## Overview

The **S.M.A.R.T Docker Installer** is a universal, secure, and fully automated deployment solution for modern **DevOps** and **GitOps** environments.  
Public Edition v2.3 is designed for **teams, start-ups, and enterprises** that need containerized workloads deployed **reliably, reproducibly, and with built-in compliance** — without depending on heavy CI/CD infrastructure.

Unlike traditional tools such as *Docker Compose*, *Portainer Stacks*, or *Jenkins Pipelines*, the S.M.A.R.T Installer introduces a self-governing control layer that combines **validation, security, rollback, observability, and auditing** in a single portable binary.  
It runs entirely offline, requires no agents or servers, and enforces strong operational safety policies by default.

---

## What’s New in v2.3

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

## Strategic Value for DevOps Teams

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

## Competitive Landscape

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

## Quickstart

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







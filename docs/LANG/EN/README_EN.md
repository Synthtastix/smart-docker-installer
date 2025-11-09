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


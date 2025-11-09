# Changelog — Public Edition v2.3

**Project:** S.M.A.R.T Docker Installer — Public Pro CLI  
**License:** OPSL-1.0-Public Edition  
**Date:** 09 November 2025  

---

## Version 2.3 (Release: 09 Nov 2025)

### New Features & Usability Upgrades
- **`--init`** – Creates `smart.config.json`, `.env.example`, and a ready-to-use template repo in under 2 seconds  
- **`--doctor`** – Complete system diagnostics (Node, Docker, Git, TLS, SSH, Portainer)  
- **`--self-update`** – Automatically upgrades to the latest GitHub release  
- **`--set key=value`** – Inline configuration override (e.g. `targets[0].stack=prod`) without editing JSON  
- **Webhook Server** (`--webhook`) – GitHub Push → Instant Deploy (Port 3000, HMAC-SHA256 verification)  
- **Parallel Deployments** – Execute all targets simultaneously (`--parallel`, default behavior)  
- **`--rollback-to <state.json>`** – Full rollback to previous commit + state file  
- **Prometheus Metrics** – `/metrics` endpoint on Port 9090 (`smart_deploy_success`, `duration_ms`)  
- **`.env` Auto-Load** – Automatic environment variable loading (via `dotenv`)  
- **Schema Validation** – `ajv` validation for `smart.config.json` before each run  

### Security & Compliance Enhancements
- **Zero-Destruction Policy** remains **immutable** – even during rollbacks  
- **SSH 0600 + StrictHostKeyChecking** enforced for all Git operations  
- **Credential Redaction** in logs, state files, and metrics outputs  
- **State Files** written with `mode: 0600`, SHA-256 checksum, and `duration_ms`  
- **Audit Trail** extended with: `run_id`, `operator`, `hostname`, and optional `ip`  

### Bug Fixes & Optimizations
- **100 % Exit Code Consistency** – `0 = OK`, `1 = Error`, `2 = Verify Error`  
- **Retry Backoff** now global for all `fetch` and `execSync` operations  
- **Timeouts** standardized to **30 s** (configurable per target)  
- **Parallel Deployments** now feature fault isolation (a failed target no longer interrupts others)  

---

## 🔹 Version 2.2 (Release: 08 Nov 2025)

### New Features
- Extended support for **Docker Swarm deployments** with cluster health checks.  
- New `--verify-only` option for integrity checks after deployments.  
- Support for multiple targets within a single configuration (Portainer, Swarm, Local).  
- Automatic audit files with SHA-256 hash, runtime duration, and commit reference.  

### Security and Compliance Improvements
- TLS 1.2+ and SSH hardening (`StrictHostKeyChecking=yes`).  
- Zero-Destruction Policy integrated into all deployment routines.  
- Credential redaction in logs (`abc***xyz`).  
- State files always written with mode `0600`.  
- Audit structure aligned with ISO 27001 and SOC 2 Type II.  

### Bug Fixes / Optimizations
- More stable error classes and exit codes for API failures.  
- Improved retry handling for GitHub and Portainer connections.  
- Enhanced validation for Compose paths and stack names.  
- New logging system with optional JSON or plaintext output.  

---

## 🔸 Version 2.1 (Release: 08 Nov 2025)

### Functional Extensions
- Multi-target deployments through a unified configuration file.  
- CI Emitter: auto-generation of GitHub Action workflow templates.  
- SSH Deploy-Key support with custom key path.  
- `--state <file.json>` option for saving runtime and health information.  

### Security Improvements
- Automatic scope validation for GitHub tokens.  
- Webhook validation with secret hash.  
- Enhanced timeout and backoff mechanisms for API calls.  

### Quality and Reliability
- Improved schema validation for configuration files.  
- Atomic locking to prevent concurrent runs.  
- Extended preflight checks for Docker, Node, and Git environments.  

---

## 🔸 Version 2.0 (Release: 08 Nov 2025)

### Initial Public Standalone Release
- Introduced fully automated GitHub ⇄ Docker connection logic.  
- Implemented Zero-Destruction security concept.  
- Basic GitHub token handling and Docker Compose deployment logic.  
- Initial state and health check system included.  

---

**© 2025 Sebastian Huehn**  
This changelog may be shared freely as long as it remains unaltered.

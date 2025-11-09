# Security Policy (Version 2.3)

**Version:** 2.3  **Date:** 09 November 2025  
**License:** OPSL-1.0-Public Edition  

---

## Core Principles

1. **Zero-Destruction** – Immutable, even during rollback  
2. **Auditability** – Every run generates `state/run_*.json` with SHA-256 hash  
3. **Security by Default** – TLS 1.2+, SSH 0600, credential redaction  
4. **Responsible Disclosure** – `security@thinking-lab.ai`  

---

## New Security Features (v2.3)

- **`--rollback-to`** – Only valid with a verified state file  
- **Webhook HMAC-SHA256** – Requires `WEBHOOK_SECRET`  
- **Metrics Without Secrets** – No tokens or sensitive data in `/metrics`  
- **Parallel Deployments** – Fault isolation, no cascading failures  
- **Schema Validation** – `ajv` blocks invalid configuration files  

---

## Compliance

- ISO 27001, SOC 2 Type II, GDPR, ISO 42001  
- State files: `mode 0600`, `duration_ms`, `commit`, `run_id`  

---

## ⚙️ Security Architecture

### 1. Zero-Destruction Policy
All implementations must ensure that **no routines** exist which delete, overwrite,  
or destroy data, containers, files, or system resources **without explicit consent**.  
Automated cleanup or pruning is only permitted if clearly documented  
and restricted to the tool’s own workspace.

### 2. Audit & Logging Requirements
All components must record **security-relevant events**,  
including failures, API calls, and system changes.  
Audit logs must be periodically reviewed and stored in tamper-proof formats  
(UTF-8 / JSON / digitally signed).

### 3. Access & Authentication
- Multi-Factor Authentication (MFA) is recommended for all administrative access.  
- SSH keys must be stored with `0600` file permissions.  
- API keys must **never** appear in plaintext within code or logs.  
- Secrets should only be provided via environment variables or encrypted vaults.

### 4. Network / TLS / API Communication
- All external connections must enforce TLS 1.2+ (`rejectUnauthorized:true`).  
- Insecure HTTP or plaintext sockets are **not allowed**.  
- Certificates must be regularly validated and renewed.  
- Timeouts (≤ 30 seconds) and exponential backoff mechanisms are mandatory  
  to mitigate DoS risks.

### 5. Credential Redaction & Data Protection
- Logs must never include complete tokens, passwords, or keys.  
- Redaction pattern: `abc***xyz`.  
- `.env` files must be protected through hashing or encryption (sha256 / AES-256).  
- Personally identifiable information (PII) must be pseudonymized or avoided.  

### 6. Integrity and Versioning
- Every release must include a **unique version identifier** and **SHA-256 hash**.  
- Modified files must not be redistributed under the name of an official version.  
- Rollback and recovery mechanisms must always be available.  

---

## 🧠 Responsible Disclosure Policy

Security researchers, developers, and users are encouraged  
to report potential vulnerabilities **confidentially**  
and **not disclose them publicly** until a patch is available.

**Contact:** security@thinking-lab.ai  
**PGP Key:** available upon request  

Reported issues are acknowledged within **72 hours**  
and assessed or prioritized within **14 days**.  
This process follows **ISO 29147** (Responsible Disclosure)  
and **ISO 30111** (Vulnerability Handling).  

---

## 📜 Compliance & Auditability

This policy complies with the following international standards and frameworks:

- **ISO/IEC 27001** – Information Security Management  
- **SOC 2 Type II** – Security & Integrity  
- **GDPR Article 32** – Technical and Organizational Measures  
- **ISO/IEC 42001** – Artificial Intelligence Management Systems  

---

**© 2025 Sebastian Huehn**  
This policy may be freely shared as long as it remains unchanged.

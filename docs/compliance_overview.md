# 🛡️ Compliance Overview

| Standard | Implemented Measure |
|-----------|--------------------|
| ISO 27001 | Audit logs, role/token usage, enforced TLS/SSH hardening |
| SOC 2 Type II | Traceability, Zero-Destruction policy, monitoring hooks |
| GDPR Art. 32 | Secret/PII masking, enforced TLS |
| ISO/IEC 42001 | Governance controls in the deployment process |

## Audit Artifacts
- `./.state/last_run.json` (machine-readable state)
- `./logs/installer.log` (masked events)
- Optional: digitally signed external snapshots

## Recommendations
- Use ENV/Vault for secrets, never commit them to Git  
- Limit token scopes (GitHub, Portainer)  
- Rotate API tokens/keys regularly

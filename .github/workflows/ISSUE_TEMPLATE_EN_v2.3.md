---
name: Bug Report / Feature Request (v2.3)
about: Report a bug, request a feature, or ask a technical question regarding the S.M.A.R.T Docker Installer — Public Edition v2.3
title: "[v2.3] <short descriptive title>"
labels: triage
assignees: ""
---

## ☑️ Type
- [ ] Bug
- [ ] Feature
- [ ] Question / Tech Support
- [ ] Documentation

## 🧭 Summary
<!-- 2–3 sentences describing what happened or what you’d like to achieve. -->

## 🔁 Steps to Reproduce (for bugs)
1. 
2. 
3. 

### Expected Behavior
<!-- What should happen? -->

### Actual Behavior
<!-- What happens instead? -->

### Minimal Config to Reproduce
<!-- Relevant snippet from smart.config.json, .env (with **MASKED** secrets), swarm.deploy.* etc. -->
```jsonc
// smart.config.json (excerpt, no secrets)
{
  "version": "2.3",
  "...": "..."
}
```

---

## 🧪 Diagnostic Artifacts (v2.3)
> Please execute these commands **before reporting** and attach their outputs:
```bash
node stacklink-smart_public_v2.3.js --doctor --log-json
node stacklink-smart_public_v2.3.js --config smart.config.json --verify-only --log-json
```
- [ ] Attached `--doctor` output  
- [ ] Attached `--verify-only` output  
- [ ] Attached last state file (`.state/last_run.json` or `state/run_*.json`)

---

## 🔐 Webhook & Security (if applicable)
- Webhook active: [ ] Yes  [ ] No  
- Signature validation (HMAC-SHA256 with `WEBHOOK_SECRET`): [ ] Yes  [ ] No  
- Last delivery timestamp + HTTP status:  
- Repository / Branch / Commit triggering the deployment:  

---

## 📈 Metrics / Observability (if applicable)
- Prometheus enabled (Port 9090): [ ] Yes  [ ] No  
- Relevant metrics (excerpt, no secrets):
```
smart_deploy_success{target="..."} 
smart_deploy_duration_ms{target="..."} 
smart_targets_total
```
- Grafana / Datadog dashboard connected: [ ] Yes  [ ] No  

---

## ⚙️ Environment
- OS / Distro:  
- Architecture (amd64 / arm64):  
- Node.js Version:  
- npm / pnpm / yarn Version:  
- Docker Engine:  
- Docker Compose:  
- Portainer (if used):  
- Swarm enabled: [ ] Yes  [ ] No  
- TLS ≥ 1.2 enforced: [ ] Yes  [ ] No  
- SSH StrictHostKeyChecking enabled: [ ] Yes  [ ] No  
- S.M.A.R.T CLI Version: `v2.3`  
- Commit Hash (if Self-Update / Custom Build):  

---

## 🧷 Zero-Destruction & Rollback
- Used destructive flags (`--allow-destructive` etc.)? [ ] Yes  [ ] No  
- Rollback attempted? [ ] Yes (specify file/hash)  [ ] No  
- State file hash (SHA-256):  

---

## 📝 Logs / Screenshots
> **Important:** Please mask any secrets/tokens (`abc***xyz`).
```
<relevant log lines>
```

---

## 📌 Priority & Impact
- Priority: [ ] Low  [ ] Medium  [ ] High  [ ] Critical  
- Affects: [ ] Development  [ ] Staging  [ ] Production  
- Regression since version:  

---

# 💡 Feature Request (Feature-Only Section)
## Goal & Benefit
<!-- What problem does this solve? Who benefits? Describe in 2–3 sentences. -->

## Proposal
<!-- Describe desired CLI option / API / config fields. Include examples if possible. -->

### Example Configuration
```jsonc
{
  "version": "2.3",
  "features": {
    "example": true
  }
}
```

## Acceptance Criteria
- [ ] ...
- [ ] ...
- [ ] ...

## Risks & Security
- Potential impact on Zero-Destruction or compliance:  
- Telemetry / logging considerations:  

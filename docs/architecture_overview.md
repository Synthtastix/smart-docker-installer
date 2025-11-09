# 🧭 Architecture Overview

```text
Developer → GitHub Repo ──► CI/CD (optional)
                           │
                           ├─► S.M.A.R.T Installer (CLI, Node.js ≥ 20)
                           │       ├─ Preflight & Zero-Destruction Guard
                           │       ├─ Config Loader (smart.config.json)
                           │       ├─ Target Adapters:
                           │       │    • Portainer API
                           │       │    • Docker Swarm
                           │       │    • Local Compose
                           │       ├─ Retry/Backoff + TLS/SSH Enforcement
                           │       └─ Audit Logger (JSON)
                           │
                           └─► Target Runtime
                                   ├─ Portainer (Stacks)
                                   ├─ Docker Swarm (Stacks)
                                   └─ Local Docker (Compose)
```

## Modules
- **Config Loader:** Validates schema & paths, masks secrets.  
- **Target Adapter:** Unified API for Portainer/Swarm/Local deployments.  
- **Zero-Destruction Guard:** Prevents destructive operations.  
- **Audit Logger:** Writes immutable JSON events (optionally SHA-256 signed).  
- **Health/Verify:** Performs post-deployment checks per service/stack.

## Data Flow
1. Input: `smart.config.json` → validation  
2. Execution: adapter communicates with target (with retry/backoff)  
3. Output: status + audit → `./.state/last_run.json` / `./logs/installer.log`

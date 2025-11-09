
---

### 📘 `CHANGELOG_v2.3_NL.md`
```markdown
# Wijzigingslog — Publieke Editie v2.3

**Project:** S.M.A.R.T Docker Installer — Publieke Pro CLI  
**Licentie:** OPSL-1.0 Publieke Editie  
**Datum:** 9 november 2025  

---

## Versie 2.3 (9 nov 2025)

### Nieuwe functies en verbeteringen
- `--init` maakt `smart.config.json` en `.env.example`.  
- `--doctor` voert volledige systeemaudit uit.  
- `--self-update` haalt laatste GitHub-versie op.  
- `--set` wijzigt configuratiewaarden inline.  
- Webhook-server met HMAC-SHA256-verificatie.  
- Parallelle deployments voor meerdere targets.  
- `--rollback-to` herstelt vorige state.  
- Prometheus-metrics (poort 9090).  
- Automatisch `.env`-laden.  
- Schema-validatie met AJV.  

### Beveiliging & compliance
- Zero-Destruction-beleid blijft onveranderlijk.  
- SSH 0600 + StrictHostKeyChecking.  
- Gemaskeerde credentials in logs en state-bestanden.  
- SHA-256 checksum + rechten 0600.  
- Audit uitgebreid met `run_id`, `hostname`, `ip`.  

### Fouten & optimalisaties
- Consistente exitcodes (0 OK / 1 fout / 2 verificatie).  
- Globale retry-backoff.  
- Standaard timeout 30 s.  
- Isolatie van fouten in parallelle modus.  

---

**© 2025 Sebastian Huehn**  
Mag vrij worden gedeeld zolang ongewijzigd.  

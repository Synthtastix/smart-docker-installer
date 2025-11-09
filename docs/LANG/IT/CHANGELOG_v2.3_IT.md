### 📘 `CHANGELOG_v2.3_IT.md`
```markdown
# Registro delle modifiche — Edizione Pubblica v2.3

**Progetto:** S.M.A.R.T Docker Installer — CLI Pro Pubblica  
**Licenza:** OPSL-1.0 Edizione Pubblica  
**Data:** 9 novembre 2025  

---

## Versione 2.3 (9 nov 2025)

### Nuove funzionalità e miglioramenti
- `--init` crea `smart.config.json` e `.env.example`.  
- `--doctor` diagnostica completa di sistema.  
- `--self-update` aggiorna automaticamente da GitHub.  
- `--set` modifica inline della configurazione.  
- Server Webhook con verifica HMAC-SHA256.  
- Deployment paralleli multipli.  
- `--rollback-to` ripristino stato precedente.  
- Metriche Prometheus (porta 9090).  
- Caricamento `.env` automatico.  
- Validazione schema AJV.  

### Sicurezza e conformità
- Politica Zero-Destruction immutabile.  
- SSH 0600 + StrictHostKeyChecking.  
- Mascheramento credenziali nei log.  
- File di stato con SHA-256 e permessi 0600.  
- Audit esteso con `run_id`, `hostname`, `ip`.  

### Correzioni e ottimizzazioni
- Codici di uscita uniformi (0 OK / 1 errore / 2 verifica).  
- Backoff esponenziale globale.  
- Timeout standard 30 s.  
- Isolamento dei fallimenti nei deployment paralleli.  

---

**© 2025 Sebastian Huehn**  
Questo registro può essere condiviso liberamente se non modificato.  

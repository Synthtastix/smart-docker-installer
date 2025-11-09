# Politica di Sicurezza (Versione 2.3)

**Versione:** 2.3  **Data:** 9 novembre 2025  
**Licenza:** OPSL-1.0 Edizione Pubblica  

---

## Principi fondamentali

1. **Zero-Destruction** – Invariabile, anche durante rollback.  
2. **Auditabilità** – Ogni esecuzione genera `state/run_*.json` con SHA-256.  
3. **Sicurezza per impostazione predefinita** – TLS 1.2+, SSH 0600, mascheramento credenziali.  
4. **Divulgazione responsabile** – `security@thinking-lab.ai`.  

---

## Novità (v2.3)

- `--rollback-to` valido solo con file stato verificato.  
- Webhook HMAC-SHA256 richiede `WEBHOOK_SECRET`.  
- Nessun dato sensibile in `/metrics`.  
- Deployment paralleli con isolamento errori.  
- Validazione schema tramite `ajv`.  

---

## Conformità

- ISO 27001, SOC 2 Type II, GDPR, ISO 42001.  
- File di stato: permessi 0600, `duration_ms`, `commit`, `run_id`.  

---

## ⚙️ Architettura di sicurezza

- Nessuna routine deve eliminare o sovrascrivere dati senza consenso.  
- Tutti gli eventi di sicurezza devono essere registrati in JSON firmato.  
- Chiavi SSH 0600; nessuna chiave API in chiaro.  
- TLS ≥ 1.2 obbligatorio; HTTP vietato.  
- Mascheramento pattern: `abc***xyz`.  
- Ogni versione deve includere hash SHA-256 univoco.  

---

## 🧠 Divulgazione responsabile

Segnalare vulnerabilità in modo confidenziale a `security@thinking-lab.ai`.  
Risposta entro 72h · valutazione entro 14 giorni (ISO 29147 / 30111).  

---

**© 2025 Sebastian Huehn**  
Questo documento può essere condiviso liberamente se non modificato.  

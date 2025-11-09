# Änderungsprotokoll (Changelog) — Public Edition v2.3

**Projekt:** S.M.A.R.T Docker Installer — Public Pro CLI  
**Lizenz:** OPSL‑1.0‑Public Edition  
**Stand:** 09. November 2025  

---

## Version 2.3 (Release: 09. 11. 2025)

### Neue Funktionen & Usability‑Upgrades
- **`--init`** – Erstellt `smart.config.json`, `.env.example` und Template-Repo in 2 Sekunden  
- **`--doctor`** – Vollständige Systemdiagnose (Node, Docker, Git, TLS, SSH, Portainer)  
- **`--self-update`** – Automatisches Update auf neueste GitHub-Release  
- **`--set key=value`** – Direkte Konfig-Überschreibung ohne JSON-Edit (z. B. `targets[0].stack=prod`)  
- **Webhook‑Server** (`--webhook`) – GitHub Push → Instant Deploy (Port 3000, HMAC‑SHA256)  
- **Parallele Deployments** – Alle Targets gleichzeitig (`--parallel`, Standard)  
- **`--rollback-to <state.json>`** – Vollständiger Rollback auf vorherigen Commit + State  
- **Prometheus Metrics** – `/metrics` auf Port 9090 (`smart_deploy_success`, `duration_ms`)  
- **`.env` Auto‑Load** – Kein manuelles `export` mehr (via `dotenv`)  
- **Schema‑Validierung** – `ajv` prüft `smart.config.json` vor jedem Lauf  

### Sicherheits‑ & Compliance‑Verbesserungen
- **Zero‑Destruction‑Policy** bleibt **unveränderlich** – auch bei Rollback  
- **SSH 0600 + StrictHostKeyChecking** in allen Git‑Operationen  
- **Credential‑Redaktion** in Logs, States und Metrics  
- **State‑Files** mit `mode: 0600`, SHA‑256 und `duration_ms`  
- **Audit‑Trail** erweitert: `run_id`, `operator`, `hostname`, `ip` (optional)  

### Fehlerbehebungen & Optimierungen
- **100 % Exit‑Code‑Konsistenz** – `0` = OK, `1` = Fehler, `2` = Verify‑Fehler  
- **Retry‑Backoff** nun global für alle `fetch`‑ und `execSync`‑Aufrufe  
- **Timeouts** standardisiert auf **30 s** (konfigurierbar)  
- **Parallel‑Deployments** mit Fehlerisolierung (ein fehlgeschlagener Target stoppt nicht alle)  

---

## 🔹 Version 2.2 (Release: 08. 11. 2025)

### Neue Funktionen
- Erweiterter Support für **Docker Swarm‑Deployments** mit Cluster‑Health‑Checks.  
- Neue Option `--verify-only` zur integren Statusprüfung nach Deployments.  
- Unterstützung mehrerer Targets in einer Konfiguration (Portainer, Swarm, Local).  
- Automatische Audit‑Dateien mit SHA‑256‑Hash, Laufzeit und Commit‑Nachweis.  

### Sicherheits‑ und Compliance‑Verbesserungen
- TLS 1.2+ und SSH Hardening (`StrictHostKeyChecking=yes`).  
- Zero‑Destruction‑Policy in alle Deployment‑Routinen integriert.  
- Credential‑Redaktion in Logs (`abc***xyz`).  
- State‑Dateien nun immer im Modus `0600` geschrieben.  
- Audit‑Struktur entspricht ISO 27001 und SOC 2 Type II.  

### Fehlerbehebungen / Optimierungen
- Stabilere Fehlerklassen und Exit‑Codes bei API‑Ausfällen.  
- Optimiertes Retry‑Handling bei GitHub‑ und Portainer‑Verbindungen.  
- Verbesserte Validierung von Compose‑Pfaden und Stack‑Namen.  
- Neues Logging‑System mit wahlweise JSON oder Plaintext‑Ausgabe.  

---

## 🔸 Version 2.1 (Release: 08. 11. 2025)

### Funktionale Erweiterungen
- Multi‑Target‑Deployments über eine einheitliche Konfigurationsdatei.  
- CI‑Emitter: automatische Generierung von GitHub Action Workflows.  
- SSH‑Deploy‑Key‑Unterstützung mit individuellem Key‑Pfad.  
- Option `--state <file.json>` zur Speicherung von Laufzeit‑ und Health‑Informationen.  

### Sicherheitsverbesserungen
- Automatische Scope‑Prüfung des GitHub‑Tokens.  
- Webhook‑Validierung mit Secret‑Hash.  
- Verbesserte Timeout‑ und Backoff‑Mechanismen bei API‑Calls.  

### Qualität und Zuverlässigkeit
- Verbesserte Schema‑Prüfung der Konfigurationsdatei.  
- Atomare Lock‑Mechanismen zur Verhinderung paralleler Läufe.  
- Erweiterte Preflight‑Prüfungen für Docker, Node und Git.  

---

## 🔸 Version 2.0 (Release: 08. 11. 2025)

### Erstveröffentlichung der Public‑Standalone‑Edition
- Einführung der vollautomatisierten GitHub ⇄ Docker‑Verbindungslogik.  
- Implementierung des Zero‑Destruction‑Konzepts zur Sicherheitsgewährleistung.  
- Basis‑Funktionalität für GitHub‑Token‑Handling und Docker Compose Deployments.  
- Initiales State‑ und Health‑Check‑System.  

---

**© 2025 Sebastian Huehn**  
Dieses Changelog darf frei weitergegeben werden, sofern es unverändert bleibt.

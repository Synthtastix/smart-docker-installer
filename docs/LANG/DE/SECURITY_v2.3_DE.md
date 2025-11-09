**`SECURITY_v2.3_DE.md` – Aktualisierte Sicherheitsrichtlinie**

```markdown
# Sicherheitsrichtlinie (Version 2.3)

**Version:** 2.3  **Stand:** 09. November 2025  
**Lizenz:** OPSL‑1.0‑Public Edition  

---

## Grundprinzipien

1. **Zero‑Destruction** – Unveränderlich, auch bei Rollback  
2. **Auditierbarkeit** – Jeder Lauf erzeugt `state/run_*.json` mit SHA‑256  
3. **Sicherheit by Default** – TLS 1.2+, SSH 0600, Credential‑Redaktion  
4. **Responsible Disclosure** – `security@thinking-lab.ai`  

---

## Neue Sicherheitsfeatures (v2.3)

- **`--rollback-to`** – Nur mit gültigem State‑File  
- **Webhook HMAC‑SHA256** – `WEBHOOK_SECRET` erforderlich  
- **Metrics ohne Secrets** – Keine Tokens in `/metrics`  
- **Parallel Deployments** – Fehlerisolierung (kein Domino‑Effekt)  
- **Schema‑Validierung** – `ajv` blockiert ungültige Configs  

---

## Compliance

- ISO 27001, SOC 2 Type II, GDPR, ISO 42001  
- State‑Files: `mode 0600`, `duration_ms`, `commit`, `run_id`  

---

## ⚙️ Sicherheitsarchitektur

### 1. Zero‑Destruction‑Policy
Alle Implementierungen müssen sicherstellen, dass keine Routinen enthalten sind,
die ohne explizite Zustimmung Daten, Container, Dateien oder Systemressourcen löschen,
überschreiben oder zerstören.  
Automatisierte Bereinigungen oder Prunes sind nur zulässig, wenn sie klar dokumentiert
und auf den eigenen Arbeitsbereich begrenzt sind.

### 2. Audit‑ & Protokollierungspflicht
Software‑Komponenten müssen alle sicherheitsrelevanten Aktionen protokollieren,
einschließlich Fehlerzustände, API‑Aufrufe und Systemänderungen.  
Audit‑Protokolle sind regelmäßig zu prüfen und in manipulationssicheren Formaten
(UTF‑8 / JSON / signiert) zu speichern.

### 3. Zugang & Authentifizierung
- Multi‑Factor‑Authentifizierung (MFA) ist für alle administrativen Zugänge empfohlen.  
- SSH‑Schlüssel müssen im 0600‑Modus gespeichert werden.  
- API‑Schlüssel dürfen **niemals** im Klartext in Code‑ oder Logdateien erscheinen.  
- Secrets sollten ausschließlich über Umgebungsvariablen oder verschlüsselte Vaults
  bereitgestellt werden.

### 4. Netzwerk / TLS / API‑Kommunikation
- Alle externen Verbindungen müssen TLS 1.2+ erzwingen (`rejectUnauthorized:true`).  
- Unsichere HTTP‑ oder Plain‑Sockets sind nicht zulässig.  
- Zertifikate müssen regelmäßig geprüft und erneuert werden.  
- Timeouts (≤ 30 Sekunden) und Backoff‑Mechanismen sind verpflichtend, um DoS‑Risiken zu minimieren.

### 5. Credential‑Redaktion & Datenschutz
- Protokolle dürfen keine vollständigen Tokens, Passwörter oder Keys enthalten.  
- Redaktionsmethode: `abc***xyz`.  
- `.env`‑Dateien müssen über Hash‑ oder Kryptomechanismen (sha256 / AES‑256) geschützt werden.  
- Persönliche Daten (PII) sind zu pseudonymisieren oder zu vermeiden.

### 6. Integrität und Versionierung
- Jede Veröffentlichung muss mit einer eindeutigen Versionsnummer und SHA‑256‑Hash versehen sein.  
- Veränderte Dateien dürfen nicht unter dem Namen einer offiziellen Version weitergegeben werden.  
- Rollback‑Mechanismen und Recovery‑Routinen müssen vorhanden sein.

---

## 🧠 Responsible Disclosure Policy

Sicherheitsforscher, Entwickler und Nutzer sind aufgerufen, potenzielle Schwachstellen
vertraulich zu melden und nicht öffentlich zu verbreiten, bis eine Behebung verfügbar ist.

**Meldekanal:** security@thinking‑lab.ai  
**PGP‑Key:** wird auf Anfrage bereitgestellt.  

Gemeldete Schwachstellen werden innerhalb von 72 Stunden bestätigt und innerhalb von 14 Tagen
bewertet und priorisiert. Der Meldeprozess orientiert sich an ISO 29147 (Responsible Disclosure)
und ISO 30111 (Vulnerability Handling).

---

## 📜 Compliance & Prüfbarkeit

Diese Richtlinie erfüllt die Anforderungen folgender Standards und Normen:

- ISO/IEC 27001 – Informationssicherheitsmanagement  
- SOC 2 Type II – Security & Integrity  
- GDPR Art. 32 – Technische und organisatorische Maßnahmen  
- ISO/IEC 42001 – Künstliche Intelligenz Managementsysteme  

---

**© 2025 Sebastian Huehn**  
Diese Richtlinie darf frei weitergegeben werden, sofern sie unverändert bleibt.

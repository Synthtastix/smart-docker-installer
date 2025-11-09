# Beveiligingsbeleid (Versie 2.3)

**Versie:** 2.3  **Datum:** 9 november 2025  
**Licentie:** OPSL-1.0 Publieke Editie  

---

## Kernprincipes

1. **Zero-Destruction** – onveranderlijk, ook bij rollback.  
2. **Auditability** – elke run genereert `state/run_*.json` met SHA-256.  
3. **Security-by-default** – TLS 1.2+, SSH 0600, maskering van credentials.  
4. **Responsible Disclosure** – `security@thinking-lab.ai`.  

---

## Nieuwe maatregelen (v2.3)

- `--rollback-to` alleen toegestaan met geldig state-bestand.  
- Webhook HMAC-SHA256 vereist `WEBHOOK_SECRET`.  
- Geen gevoelige data in `/metrics`.  
- Parallelle deployments met fout-isolatie.  
- Schema-validatie met `ajv`.  

---

## Naleving

- ISO 27001, SOC 2 Type II, AVG (GDPR), ISO 42001.  
- State-bestanden: rechten 0600, `duration_ms`, `commit`, `run_id`.  

---

## ⚙️ Beveiligingsarchitectuur

- Geen routines mogen data verwijderen of overschrijven zonder toestemming.  
- Alle veiligheidsgebeurtenissen moeten worden gelogd (JSON, ondertekend).  
- SSH-sleutels met 0600; geen API-sleutels in platte tekst.  
- TLS ≥ 1.2 verplicht; HTTP verboden.  
- Maskeringspatroon `abc***xyz`.  
- Elke versie moet unieke SHA-256 hash bevatten.  

---

## 🧠 Responsible Disclosure

Kwetsbaarheden vertrouwelijk melden aan `security@thinking-lab.ai`.  
Bevestiging binnen 72 uur, beoordeling binnen 14 dagen (ISO 29147 / 30111).  

---

**© 2025 Sebastian Huehn**  
Mag vrij worden gedeeld mits ongewijzigd.  

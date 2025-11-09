# Política de Seguridad (Versión 2.3)

**Versión:** 2.3  **Fecha:** 09 noviembre 2025  
**Licencia:** OPSL-1.0-Edición Pública  

---

## Principios básicos

1. **Zero-Destruction** – Inmutable, incluso en rollback.  
2. **Auditabilidad** – Cada ejecución genera `state/run_*.json` con hash SHA-256.  
3. **Seguridad por defecto** – TLS 1.2+, SSH 0600, redacción de credenciales.  
4. **Divulgación responsable** – `security@thinking-lab.ai`.  

---

## Novedades (v2.3)

- `--rollback-to` válido solo con archivo de estado verificado.  
- Webhook HMAC-SHA256 requiere `WEBHOOK_SECRET`.  
- Métricas sin datos sensibles en `/metrics`.  
- Despliegues paralelos con aislamiento de fallos.  
- Validación AJV bloquea configuraciones inválidas.  

---

## Cumplimiento

- ISO 27001, SOC 2 Tipo II, GDPR, ISO 42001.  
- Archivos de estado: modo 0600, `duration_ms`, `commit`, `run_id`.  

---

## ⚙️ Arquitectura de seguridad

- No debe existir ninguna rutina que borre o dañe recursos sin consentimiento explícito.  
- Registro de eventos de seguridad en formato JSON firmado.  
- Claves SSH con permisos 0600 y API keys enmascaradas.  
- TLS 1.2+ obligatorio; HTTP sin cifrar prohibido.  
- Logs sin tokens completos (`abc***xyz`).  
- Cada versión incluye hash SHA-256 único.  

---

## 🧠 Divulgación responsable

Informar vulnerabilidades de forma confidencial a `security@thinking-lab.ai`.  
Confirmación ≤ 72 h · Evaluación ≤ 14 días (ISO 29147 / 30111).  

---

**© 2025 Sebastian Huehn**  
Esta política puede compartirse libremente si permanece sin cambios.  


---

### 📘 `CHANGELOG_v2.3_ES.md`
```markdown
# Registro de Cambios — Edición Pública v2.3

**Proyecto:** S.M.A.R.T Docker Installer — CLI Pública Pro  
**Licencia:** OPSL-1.0-Edición Pública  
**Fecha:** 09 noviembre 2025  

---

## Versión 2.3 (09 nov 2025)

### Nuevas funciones y mejoras de usabilidad
- **`--init`** Crea `smart.config.json`, `.env.example` y plantilla en < 2 segundos.  
- **`--doctor`** Diagnóstico completo (Node, Docker, Git, TLS, SSH, Portainer).  
- **`--self-update`** Actualiza automáticamente desde GitHub.  
- **`--set clave=valor`** Sobrescribe configuración en línea sin editar JSON.  
- **Servidor Webhook** — Despliegue instantáneo (GitHub Push, verificación HMAC-SHA256).  
- **Despliegues paralelos** ejecutan todos los objetivos simultáneamente.  
- **`--rollback-to <state.json>`** Reversión completa al estado anterior.  
- **Métricas Prometheus** (`/metrics` puerto 9090).  
- **Carga automática de `.env`** mediante `dotenv`.  
- **Validación de esquema** con `ajv`.  

### Mejoras de seguridad y cumplimiento
- Política Zero-Destruction inmutable.  
- SSH 0600 + StrictHostKeyChecking.  
- Redacción de credenciales en logs y archivos de estado.  
- Archivos de estado con SHA-256 y modo 0600.  
- Auditoría ampliada (`run_id`, `operator`, `hostname`, `ip`).  

### Correcciones y optimizaciones
- Códigos de salida consistentes (0 OK, 1 Error, 2 Verificación).  
- Retardo exponencial global para todas las operaciones `fetch` y `execSync`.  
- Tiempos de espera estandarizados (30 s).  
- Aislamiento de fallos en despliegues paralelos.  

---

## 🔹 Versión 2.2 (08 nov 2025)

- Compatibilidad extendida con Docker Swarm.  
- Nueva opción `--verify-only`.  
- Soporte para múltiples objetivos en una sola configuración.  
- Archivos de auditoría automáticos con SHA-256 y duración.  
- Endurecimiento TLS 1.2+ y SSH.  
- Integración total de Zero-Destruction.  

---

**© 2025 Sebastian Huehn**  
Este registro puede compartirse libremente si permanece sin alterar.  

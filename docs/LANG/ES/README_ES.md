# 🧩 S.M.A.R.T Docker Installer — Edición Pública v2.3  
**Versión:** 2.3  **Licencia:** OPSL-1.0-Public  **Estado:** Estable / Listo para empresa  

---

## 🌐 Descripción general

**S.M.A.R.T Docker Installer** es una solución universal, segura y totalmente automatizada para entornos modernos **DevOps y GitOps**.  
La Edición Pública v2.3 está diseñada para **equipos, start-ups y organizaciones** que necesitan implementar cargas de trabajo en contenedores de forma **fiable, reproducible y conforme a las normas**, sin depender de una infraestructura CI/CD compleja.

A diferencia de herramientas tradicionales como *Docker Compose*, *Portainer Stacks* o *Jenkins Pipelines*, S.M.A.R.T Installer introduce una capa de control autónoma que combina **validación, seguridad, reversión, observabilidad y auditoría** en un único ejecutable portátil.

---

## 🚀 Novedades en v2.3

| Categoría | Descripción |
|------------|-------------|
| **Motor de autocorrección** | Detecta despliegues fallidos y ejecuta recuperación o rollback automáticamente. |
| **Validación de esquema (AJV)** | Comprueba la integridad del archivo `smart.config.json` antes de cada ejecución. |
| **Carga automática de `.env`** | Carga variables de entorno de forma segura con `dotenv`. |
| **`--set clave=valor`** | Permite sobrescribir parámetros dinámicamente en tiempo de ejecución. |
| **Modo `--doctor`** | Diagnóstico completo del sistema (Node, Docker, TLS, SSH, Portainer). |
| **`--rollback-to`** | Restaura estados anteriores con auditoría completa. |
| **Servidor Webhook (Puerto 3000)** | Recibe triggers de GitHub/GitLab para despliegues automáticos. |
| **Métricas Prometheus (Puerto 9090)** | Exporta métricas en tiempo real para monitorización. |
| **Despliegues paralelos** | Ejecuta hasta 5 objetivos simultáneamente. |

---

## 💡 Valor estratégico para equipos DevOps

1. **Confiabilidad y auditoría total** – Cada ejecución genera `./.state/last_run.json` con hash SHA-256.  
2. **Política Zero-Destruction** – Impide modificar o borrar recursos sin confirmación explícita.  
3. **Neutralidad de proveedor** – Funciona sin conexión, solo con Node.js y Docker.  
4. **Reproducibilidad determinística** – Los hash SHA garantizan versiones idénticas en cada despliegue.  
5. **Observabilidad transparente** – Exporta métricas Prometheus integradas para Grafana o Datadog.  

---

## ⚙️ Capacidades principales

| Área | Descripción |
|------|--------------|
| **Integración GitOps** | Conecta repositorios Git con Docker o Swarm directamente. |
| **Autocorrección** | Reintenta o revierte despliegues erróneos automáticamente. |
| **Protección Zero-Destruction** | Bloquea acciones destructivas por defecto. |
| **Multi-Target** | Soporta Portainer, Swarm y entornos locales simultáneamente. |
| **Ejecución paralela** | Hasta 5 despliegues concurrentes de forma segura. |
| **Rollback auditable** | Reversión instantánea a cualquier estado previo. |
| **Enforzamiento TLS/SSH** | TLS ≥ 1.2 y validación de clave de host SSH. |
| **Anulación dinámica** | `--set` permite ajustar configuraciones al vuelo. |
| **Diagnóstico integral** | `--doctor` analiza versiones y seguridad. |
| **Métricas y Webhooks** | API integrada para /metrics y Webhook Server. |

---

## 🧩 Comparativa con otras soluciones

| Producto | Arquitectura | Seguridad | Despliegue paralelo | Autocorrección | Observabilidad | Licencia |
|-----------|--------------|-----------|---------------------|----------------|----------------|-----------|
| **S.M.A.R.T Installer v2.3** | CLI + API Standalone | ✅ Zero-Destruction + TLS 1.2+ | ✅ | ✅ | ✅ Prometheus + Audit Logs | OPSL-Public |
| Docker Compose CLI | Local manual | ⚠️ Sin política | ❌ | ❌ | ❌ | Apache 2.0 |
| Portainer Stacks | Web UI / API | ✅ TLS + RBAC | ⚠️ Secuencial | ❌ | ⚠️ Logs básicos | CE / BE |
| Jenkins Pipelines | Servidor | ⚠️ Depende del setup | ✅ | ⚠️ Parcial | ⚠️ Plugins | MIT |
| Rancher CLI | Cloud / K8s | ✅ | ❌ | ❌ | ⚠️ Solo cluster | Apache 2.0 |

---

## ⚡ Inicio rápido

```bash
git clone https://github.com/<user>/smart-docker-installer.git
cd smart-docker-installer
node stacklink-smart_public_v2.3.js --init
vim .env
node stacklink-smart_public_v2.3.js --config smart.config.json --dry-run
node stacklink-smart_public_v2.3.js --config smart.config.json --target prod --log-json

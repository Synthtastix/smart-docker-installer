# 🧩 S.M.A.R.T Docker Installer — Edizione Pubblica v2.3  
**Versione:** 2.3  **Licenza:** OPSL-1.0-Public  **Stato:** Stabile / Pronto per l’impresa  

---

## 🌐 Panoramica

Il **S.M.A.R.T Docker Installer** è una soluzione universale, sicura e completamente automatizzata per ambienti **DevOps** e **GitOps** moderni.  
L’Edizione Pubblica v2.3 è stata progettata per **team, start-up e PMI** che desiderano distribuire container **in modo affidabile, ripetibile e conforme** senza dipendere da infrastrutture CI/CD complesse.

A differenza di strumenti come *Docker Compose*, *Portainer Stacks* o *Jenkins Pipelines*, il S.M.A.R.T Installer introduce un livello di controllo autonomo che combina **validazione, sicurezza, rollback, osservabilità e audit** in un unico eseguibile portatile.

---

## 🚀 Novità della versione 2.3

| Categoria | Descrizione |
|------------|-------------|
| **Motore di auto-riparazione** | Rileva automaticamente i deployment falliti e avvia il ripristino o il rollback. |
| **Validazione schema (AJV)** | Verifica la correttezza di `smart.config.json` prima di ogni esecuzione. |
| **Caricamento automatico `.env`** | Carica in sicurezza le variabili d’ambiente tramite `dotenv`. |
| **`--set chiave=valore`** | Permette di sovrascrivere dinamicamente i valori della configurazione. |
| **Modalità `--doctor`** | Diagnosi completa di sistema (Node, Docker, TLS, SSH, Portainer). |
| **`--rollback-to`** | Ripristina uno stato precedente con audit completo. |
| **Server Webhook (porta 3000)** | Riceve trigger da GitHub/GitLab per deployment automatizzati. |
| **Metriche Prometheus (porta 9090)** | Esporta metriche in tempo reale per il monitoraggio. |
| **Deployment paralleli** | Esegue fino a 5 target contemporaneamente. |

---

## 💡 Valore strategico per i team DevOps

1. **Affidabilità e tracciabilità totale** — ogni esecuzione genera `./.state/last_run.json` con hash SHA-256.  
2. **Politica Zero-Destruction** — impedisce modifiche o cancellazioni non autorizzate.  
3. **Neutralità del fornitore** — funziona offline, richiede solo Node.js e Docker.  
4. **Riproducibilità deterministica** — gli hash SHA garantiscono deployment identici.  
5. **Osservabilità trasparente** — metriche Prometheus integrate per Grafana o Datadog.  

---

## ⚙️ Funzionalità principali

| Area | Descrizione |
|------|--------------|
| **Integrazione GitOps** | Collega i repository Git direttamente a Docker/Swarm. |
| **Auto-riparazione** | Ritenta o ripristina automaticamente i deployment falliti. |
| **Protezione Zero-Destruction** | Blocca per impostazione predefinita le azioni distruttive. |
| **Multi-target** | Supporta Portainer, Swarm e ambienti locali. |
| **Esecuzione parallela** | Fino a 5 deployment simultanei. |
| **Rollback auditabile** | Ripristino istantaneo a qualsiasi stato precedente. |
| **Rafforzamento TLS/SSH** | TLS ≥ 1.2 e verifica chiavi host SSH. |
| **Override dinamico** | `--set` consente di modificare parametri in tempo reale. |
| **Diagnostica completa** | `--doctor` controlla versioni e sicurezza. |
| **Metriche e Webhook** | API integrate per `/metrics` e Webhook Server. |

---

## 🧩 Confronto con altri strumenti

| Prodotto | Architettura | Sicurezza | Deploy paralleli | Auto-riparazione | Osservabilità | Licenza |
|-----------|---------------|-----------|------------------|------------------|----------------|-----------|
| **S.M.A.R.T v2.3** | CLI + API Standalone | ✅ Zero-Destruction + TLS 1.2+ | ✅ | ✅ | ✅ Prometheus + Audit | OPSL-Public |
| Docker Compose CLI | Locale / manuale | ⚠️ Nessuna policy | ❌ | ❌ | ❌ | Apache 2.0 |
| Portainer Stacks | Web UI / API | ✅ TLS + RBAC | ⚠️ Sequenziale | ❌ | ⚠️ Log base | CE / BE |
| Jenkins Pipelines | Server | ⚠️ Dipende dalla config | ✅ | ⚠️ Parziale | ⚠️ Plugin | MIT |
| Rancher CLI | Cloud / K8s | ✅ | ❌ | ❌ | ⚠️ Solo cluster | Apache 2.0 |

---

## ⚡ Guida rapida

```bash
git clone https://github.com/<user>/smart-docker-installer.git
cd smart-docker-installer
node stacklink-smart_public_v2.3.js --init
vim .env
node stacklink-smart_public_v2.3.js --config smart.config.json --dry-run
node stacklink-smart_public_v2.3.js --config smart.config.json --target prod --log-json

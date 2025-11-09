# 🧩 S.M.A.R.T Docker Installer — Publieke Editie v2.3  
**Versie:** 2.3  **Licentie:** OPSL-1.0-Public  **Status:** Stabiel / Bedrijfs-klaar  

---

## 🌐 Overzicht

De **S.M.A.R.T Docker Installer** is een universele, veilige en volledig geautomatiseerde oplossing voor moderne **DevOps**- en **GitOps**-omgevingen.  
De Publieke Editie v2.3 is ontwikkeld voor **teams, start-ups en middelgrote bedrijven** die container-workloads **betrouwbaar, reproduceerbaar en conform** willen implementeren, zonder zware CI/CD-infrastructuur.

In tegenstelling tot tools als *Docker Compose*, *Portainer Stacks* of *Jenkins Pipelines*, introduceert S.M.A.R.T Installer een zelf-controlerend systeem dat **validatie, beveiliging, rollback, observability en auditing** combineert in één draagbare CLI.

---

## 🚀 Wat is nieuw in v2.3

| Categorie | Beschrijving |
|------------|--------------|
| **Self-Healing Engine** | Detecteert mislukte deployments en voert automatisch herstel of rollback uit. |
| **Schema-validatie (AJV)** | Controleert de geldigheid van `smart.config.json` vóór elke run. |
| **Automatisch `.env`-laden** | Laadt veilig omgevingsvariabelen via `dotenv`. |
| **`--set key=value`** | Dynamische configuratie-overschrijving tijdens runtime. |
| **`--doctor`-modus** | Volledige systeemdiagnose (Node, Docker, TLS, SSH, Portainer). |
| **`--rollback-to`** | Herstelt vorige status met volledig auditlog. |
| **Webhook-server (poort 3000)** | Ontvangt GitHub/GitLab-triggers voor automatische deployments. |
| **Prometheus-metrics (poort 9090)** | Exporteert realtime metrics voor monitoring. |
| **Parallelle deployments** | Tot 5 doelen gelijktijdig uitvoeren. |

---

## 💡 Strategische waarde voor DevOps-teams

1. **Betrouwbaarheid & audit-traceerbaarheid** — elke run genereert `./.state/last_run.json` met SHA-256-hash.  
2. **Zero-Destruction-beleid** — voorkomt verwijderingen of overschrijvingen zonder expliciete toestemming.  
3. **Vendor-onafhankelijk** — werkt volledig offline met alleen Node.js en Docker.  
4. **Deterministische reproduceerbaarheid** — identieke builds dankzij hash-validatie.  
5. **Transparante observability** — ingebouwde Prometheus-metrics compatibel met Grafana of Datadog.  

---

## ⚙️ Belangrijkste functies

| Domein | Beschrijving |
|--------|---------------|
| **GitOps-integratie** | Verbindt Git-repositories direct met Docker/Swarm. |
| **Self-Healing** | Herstelt mislukte deployments automatisch. |
| **Zero-Destruction-guard** | Blokkeert destructieve acties standaard. |
| **Multi-target-support** | Ondersteunt Portainer, Swarm en lokale omgevingen. |
| **Parallelle uitvoering** | Tot 5 gelijktijdige deployments. |
| **Rollback-mechanisme** | Herstelt elke vorige state onmiddellijk. |
| **TLS/SSH-afdwinging** | TLS ≥ 1.2 en strikte host-sleutelcontrole. |
| **Dynamische overrides** | `--set` past configuratie live aan. |
| **Systeemdiagnose** | `--doctor` controleert versies en beveiliging. |
| **Metrics & Webhooks** | Geïntegreerde `/metrics`-API + Webhook-listener. |

---

## 🧩 Vergelijking met andere oplossingen

| Product | Architectuur | Beveiliging | Parallel Deploy | Zelfherstel | Observability | Licentie |
|----------|---------------|-------------|-----------------|--------------|----------------|-----------|
| **S.M.A.R.T v2.3** | CLI + API Standalone | ✅ Zero-Destruction + TLS 1.2+ | ✅ | ✅ | ✅ Prometheus + Audit | OPSL-Public |
| Docker Compose CLI | Lokaal / handmatig | ⚠️ Geen policy | ❌ | ❌ | ❌ | Apache 2.0 |
| Portainer Stacks | Web UI / API | ✅ TLS + RBAC | ⚠️ Sequentieel | ❌ | ⚠️ Basis-logs | CE / BE |
| Jenkins Pipelines | Server-gebaseerd | ⚠️ Config-afhankelijk | ✅ | ⚠️ Gedeeltelijk | ⚠️ Plugins | MIT |
| Rancher CLI | Cloud / K8s | ✅ | ❌ | ❌ | ⚠️ Alleen cluster | Apache 2.0 |

---

## ⚡ Snelstart

```bash
git clone https://github.com/<user>/smart-docker-installer.git
cd smart-docker-installer
node stacklink-smart_public_v2.3.js --init
vim .env
node stacklink-smart_public_v2.3.js --config smart.config.json --dry-run
node stacklink-smart_public_v2.3.js --config smart.config.json --target prod --log-json

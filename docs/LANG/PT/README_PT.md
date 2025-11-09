# 🧩 S.M.A.R.T Docker Installer — Edição Pública v2.3  
**Versão:** 2.3  **Licença:** OPSL-1.0-Public  **Status:** Estável / Pronto para uso corporativo  

---

## 🌐 Visão geral

O **S.M.A.R.T Docker Installer** é uma solução universal, segura e totalmente automatizada para ambientes **DevOps** e **GitOps** modernos.  
A Edição Pública v2.3 foi projetada para **equipes, start-ups e empresas** que precisam implantar cargas de trabalho em contêineres de forma **confiável, reproduzível e compatível**, sem depender de infraestruturas CI/CD complexas.

Diferentemente de ferramentas como *Docker Compose*, *Portainer Stacks* ou *Jenkins Pipelines*, o S.M.A.R.T Installer introduz uma camada de controle autônoma que combina **validação, segurança, rollback, observabilidade e auditoria** em um único executável portátil.

---

## 🚀 Novidades na versão 2.3

| Categoria | Descrição |
|------------|-----------|
| **Motor de auto-recuperação** | Detecta implantações com falha e executa recuperação ou rollback automaticamente. |
| **Validação de esquema (AJV)** | Verifica a integridade de `smart.config.json` antes de cada execução. |
| **Carregamento automático de `.env`** | Carrega variáveis de ambiente com segurança via `dotenv`. |
| **`--set chave=valor`** | Permite substituir valores da configuração dinamicamente em tempo de execução. |
| **Modo `--doctor`** | Diagnóstico completo do sistema (Node, Docker, TLS, SSH, Portainer). |
| **`--rollback-to`** | Restaura estados anteriores com histórico completo de auditoria. |
| **Servidor Webhook (porta 3000)** | Recebe gatilhos do GitHub/GitLab para deploy automatizado. |
| **Métricas Prometheus (porta 9090)** | Exporta métricas em tempo real para monitoramento. |
| **Implantações paralelas** | Executa até 5 destinos simultaneamente. |

---

## 💡 Valor estratégico para equipes DevOps

1. **Confiabilidade e rastreabilidade total** — cada execução gera `./.state/last_run.json` com hash SHA-256.  
2. **Política Zero-Destruction** — impede modificações ou exclusões sem autorização explícita.  
3. **Independência de fornecedor** — funciona totalmente offline com Node.js e Docker.  
4. **Reprodutibilidade determinística** — garante implantações idênticas em cada execução.  
5. **Observabilidade transparente** — exporta métricas Prometheus compatíveis com Grafana ou Datadog.  

---

## ⚙️ Recursos principais

| Área | Descrição |
|------|------------|
| **Integração GitOps** | Conecta repositórios Git diretamente ao Docker/Swarm. |
| **Auto-recuperação** | Retenta ou reverte implantações com falha. |
| **Proteção Zero-Destruction** | Bloqueia ações destrutivas por padrão. |
| **Suporte multi-alvo** | Portainer, Swarm e ambientes locais. |
| **Execução paralela** | Até 5 implantações simultâneas. |
| **Rollback auditável** | Restauração imediata a qualquer estado anterior. |
| **Reforço TLS/SSH** | TLS ≥ 1.2 e verificação de host SSH. |
| **Substituição dinâmica** | `--set` permite ajustes em tempo real. |
| **Diagnóstico completo** | `--doctor` executa checagens de segurança e compatibilidade. |
| **Métricas e Webhooks** | API integrada `/metrics` + listener de webhook. |

---

## 🧩 Comparativo com outras ferramentas

| Produto | Arquitetura | Segurança | Deploy Paralelo | Auto-recuperação | Observabilidade | Licença |
|----------|--------------|------------|------------------|------------------|-----------------|----------|
| **S.M.A.R.T v2.3** | CLI + API Standalone | ✅ Zero-Destruction + TLS 1.2+ | ✅ | ✅ | ✅ Prometheus + Audit | OPSL-Public |
| Docker Compose CLI | Local / Manual | ⚠️ Sem política | ❌ | ❌ | ❌ | Apache 2.0 |
| Portainer Stacks | Web UI / API | ✅ TLS + RBAC | ⚠️ Sequencial | ❌ | ⚠️ Logs básicos | CE / BE |
| Jenkins Pipelines | Baseado em servidor | ⚠️ Config-dependente | ✅ | ⚠️ Parcial | ⚠️ Plugins | MIT |
| Rancher CLI | Cloud / K8s | ✅ | ❌ | ❌ | ⚠️ Apenas em nível de cluster | Apache 2.0 |

---

## ⚡ Guia rápido

```bash
git clone https://github.com/<user>/smart-docker-installer.git
cd smart-docker-installer
node stacklink-smart_public_v2.3.js --init
vim .env
node stacklink-smart_public_v2.3.js --config smart.config.json --dry-run
node stacklink-smart_public_v2.3.js --config smart.config.json --target prod --log-json

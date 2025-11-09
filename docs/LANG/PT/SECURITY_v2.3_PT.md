# Política de Segurança (Versão 2.3)

**Versão:** 2.3  **Data:** 9 de novembro de 2025  
**Licença:** OPSL-1.0 Edição Pública  

---

## Princípios fundamentais

1. **Zero-Destruction** – Inalterável, mesmo durante rollback.  
2. **Auditabilidade** – Cada execução gera `state/run_*.json` com hash SHA-256.  
3. **Segurança por padrão** – TLS 1.2+, SSH 0600, mascaramento de credenciais.  
4. **Divulgação responsável** – `security@thinking-lab.ai`.  

---

## Novidades (v2.3)

- `--rollback-to` válido apenas com arquivo de estado verificado.  
- Webhook HMAC-SHA256 requer `WEBHOOK_SECRET`.  
- Nenhum dado sensível em `/metrics`.  
- Execuções paralelas com isolamento de falhas.  
- Validação de esquema com `ajv`.  

---

## Conformidade

- ISO 27001, SOC 2 Tipo II, GDPR, ISO 42001.  
- Arquivos de estado: modo 0600, `duration_ms`, `commit`, `run_id`.  

---

## ⚙️ Arquitetura de segurança

- Nenhuma rotina pode excluir ou sobrescrever dados sem consentimento explícito.  
- Todos os eventos de segurança devem ser registrados (JSON assinado).  
- Chaves SSH com permissões 0600; nenhuma chave API em texto puro.  
- TLS ≥ 1.2 obrigatório; HTTP proibido.  
- Padrão de mascaramento: `abc***xyz`.  
- Cada versão deve conter um hash SHA-256 exclusivo.  

---

## 🧠 Divulgação responsável

Relate vulnerabilidades confidencialmente para `security@thinking-lab.ai`.  
Confirmação em até 72h · avaliação em até 14 dias (ISO 29147 / 30111).  

---

**© 2025 Sebastian Huehn**  
Pode ser compartilhado livremente, desde que permaneça inalterado.  

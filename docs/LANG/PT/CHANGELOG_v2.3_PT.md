
---

### 📘 `CHANGELOG_v2.3_PT.md`
```markdown
# Registro de Alterações — Edição Pública v2.3

**Projeto:** S.M.A.R.T Docker Installer — CLI Pro Pública  
**Licença:** OPSL-1.0 Edição Pública  
**Data:** 9 de novembro de 2025  

---

## Versão 2.3 (9 nov 2025)

### Novos recursos e melhorias
- `--init` cria `smart.config.json` e `.env.example`.  
- `--doctor` executa diagnóstico completo.  
- `--self-update` atualiza automaticamente a partir do GitHub.  
- `--set` substitui parâmetros em linha.  
- Servidor Webhook com autenticação HMAC-SHA256.  
- Suporte a implantações paralelas.  
- `--rollback-to` restaura o estado anterior.  
- Métricas Prometheus (porta 9090).  
- Carregamento automático de `.env`.  
- Validação de esquema com AJV.  

### Segurança e conformidade
- Política Zero-Destruction inalterável.  
- SSH 0600 + StrictHostKeyChecking.  
- Credenciais mascaradas em logs e estados.  
- Arquivos de estado com SHA-256 e permissões 0600.  
- Auditoria estendida (run_id, operador, hostname, ip).  

### Correções e otimizações
- Códigos de saída consistentes (0 OK / 1 erro / 2 verificação).  
- Backoff exponencial global.  
- Timeout padrão de 30 s.  
- Isolamento de falhas em execuções paralelas.  

---

**© 2025 Sebastian Huehn**  
Este registro pode ser compartilhado livremente, desde que permaneça inalterado.  

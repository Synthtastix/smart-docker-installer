# Polityka bezpieczeństwa (Wersja 2.3)

**Wersja:** 2.3  **Data:** 9 listopada 2025  
**Licencja:** OPSL-1.0 Edycja Publiczna  

---

## Zasady podstawowe

1. **Zero-Destruction** – Niezmienna, nawet podczas rollbacku.  
2. **Audytowalność** – Każde uruchomienie generuje `state/run_*.json` z SHA-256.  
3. **Bezpieczeństwo domyślne** – TLS 1.2+, SSH 0600, maskowanie haseł.  
4. **Zgłaszanie luk** – `security@thinking-lab.ai`.  

---

## Nowości (v2.3)

- `--rollback-to` tylko z zatwierdzonym plikiem stanu.  
- Webhook HMAC-SHA256 wymaga `WEBHOOK_SECRET`.  
- Brak danych wrażliwych w `/metrics`.  
- Równoległe wdrożenia z izolacją błędów.  
- Walidacja AJV blokuje błędne konfiguracje.  

---

## Zgodność

- ISO 27001, SOC 2 Type II, RODO (GDPR), ISO 42001.  
- Pliki stanu: tryb 0600, `duration_ms`, `commit`, `run_id`.  

---

## ⚙️ Architektura bezpieczeństwa

- Żadne procesy nie mogą usuwać ani modyfikować danych bez zgody.  
- Zdarzenia bezpieczeństwa muszą być logowane (JSON podpisany).  
- Klucze SSH z uprawnieniami 0600; brak kluczy API w tekście jawnym.  
- TLS ≥ 1.2 obowiązkowy; HTTP niedozwolony.  
- Wzór maskowania: `abc***xyz`.  
- Każda wersja musi posiadać unikalny hash SHA-256.  

---

## 🧠 Odpowiedzialne ujawnianie

Luki bezpieczeństwa prosimy zgłaszać poufnie na `security@thinking-lab.ai`.  
Potwierdzenie w ciągu 72h · weryfikacja do 14 dni (ISO 29147 / 30111).  

---

**© 2025 Sebastian Huehn**  
Dokument może być udostępniany swobodnie, jeśli pozostaje niezmieniony.  

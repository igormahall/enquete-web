# 🗳️ Frontend Angular — Sistema de Enquetes

Interface web para consumir a **API de Enquetes** (Django).  
Construída em **Angular 17** com _Standalone Components_ e **Reactive Forms**.

---

## ✨ Visão Geral

| Item | Detalhe |
|------|---------|
| **Stack** | Angular 17 · TypeScript · RxJS · Vite · Tailwind |
| **Arquitetura** | Standalone Components + feature folders |
| **API** | Django REST Framework (`/api/enquetes/…`) |
| **Estado** | Serviços `EnqueteService` + Observables |
| **Build** | `pnpm run build` / `vite preview` |
| **Deploy** | Qualquer static host (GitHub Pages, Netlify, Vercel, S3…) |

---

## 📂 Estrutura de Pastas (src/app)

```
src/app
├─ models/        # Interfaces TypeScript (Enquete, Opcao)
├─ services/      # Acesso à API e cache de dados
├─ components/    # UI isolada e reutilizável
└─ app.routes.ts  # Rotas raiz
```

---

## ⚙️ Configuração Inicial

1. **Criar projeto**
   ```bash
   pnpm create @angular/app@latest enquetes-frontend --standalone
   cd enquetes-frontend
   ```

2. **HTTP global**  
   Em `app.config.ts` habilitamos `provideHttpClient()` para uso de `HttpClient` em toda a aplicação.

3. **CORS no backend**  
   No Django adicionamos `django-cors-headers` permitindo `http://localhost:4200`.

---

## 🎯 Funcionalidades Principais

| Serviço | Método | Chamada | Descrição |
|---------|--------|---------|-----------|
| `EnqueteService` | `getEnquetes()` | `GET /api/enquetes/` | Lista todas as enquetes ativas |
| | `getEnqueteById(id)` | `GET /api/enquetes/{id}/` | Detalhe de uma enquete |
| | `createEnquete(data)` | `POST /api/enquetes/` | Cria enquete (`titulo`, `opcoes_input[]`) |
| | `votar(enqueteId, opcaoId, participantId)` | `POST /api/enquetes/{id}/votar/` | Registra voto |

---

## 🧩 Componentização & Rotas

| Rota | Componente | Responsabilidade |
|------|------------|------------------|
| `/` | **EnqueteListComponent** | Lista enquetes + link _“Nova Enquete”_ |
| `/enquetes/:id` | **EnqueteDetailComponent** | Detalhe, votação, ranking ao vivo |
| `/enquetes/nova` | **EnqueteFormComponent** | Formulário reativo para criação |
| _(global)_ | **NotificationComponent** | Toasts de sucesso/erro |
| _(shell)_ | **AppComponent** | `<router-outlet>` + layout base |

---

## 💎 Experiência do Usuário

- **Toasts**: `NotificationService` exibe feedback não-intrusivo.
- **Votação segura**: Botões desabilitados → `"Votando..."` para evitar duplo clique.
- **Destaque do vencedor**: Opção líder recebe _fundo verde_.
- **Status da enquete**: Banner se **Fechada** + botões desabilitados.
- **Simulação de multi-usuário**: Campo _“Nome do participante”_ testa regra _1 voto / usuário_.
- **Navegação limpa**: `routerLink="/"` no botão **Voltar** evita loop no histórico.

---

## 🚀 Deploy

1. **Backend**: publique o Django (Heroku, Render, Fly .io, VPS).
2. **Frontend**:
   ```bash
   pnpm run build            # Gera /dist
   pnpm vite preview         # Teste local
   ```
   Faça upload do conteúdo de `dist/` em host estático (GitHub Pages, Netlify…).

3. **Configurar URLs**
  - Defina `API_BASE_URL` conforme domínio de produção.
  - Mantenha CORS atualizado no backend.

---

## 🤝 Contribuição

1. Fork → Crie branch → _Commit_ claro
2. `pnpm run lint` e `pnpm run test` antes do PR
3. Descreva o _contexto_ no PR template

---

## 📝 Licença

Distribuído sob a licença **MIT** — veja `LICENSE` para mais detalhes.

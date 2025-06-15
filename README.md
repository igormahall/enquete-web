# 🗳️ Frontend Angular — Sistema de Enquetes

Interface web para consumir a **API de Enquetes** (Django).  
Construída em **Angular 17** com _Standalone Components_ e **Reactive Forms**.

---

## ✨ Visão Geral

| Item            | Detalhe                                                  |
|-----------------|----------------------------------------------------------|
| **Stack**       | Angular 17 · TypeScript · RxJS · Vite · Tailwind         |
| **Arquitetura** | Standalone Components + Services + feature folders       |
| **API**         | Django REST Framework (`/api/enquetes/…`)                |
| **Estado**      | Serviços `EnqueteService` + Observables (RxJS)           |
| **Build**       | `ng build`                                               |
| **Deploy**      | Qualquer host de sites estáticos (Netlify, Vercel, etc.) |

---

## 📂 Estrutura de Pastas (src/app)

```
src/app
├─ models/        # Interfaces TypeScript (Enquete, Opcao)
├─ services/      # Lógica de acesso à API e de notificações
├─ components/    # Componentes de UI para cada tela/feature
└─ app.routes.ts  # Rotas raiz da aplicação
```

---

## ⚙️ Configuração Inicial

1. **Clonar e Instalar**
   ```bash
   # Clonar o repositório
   git clone https://github.com/<seu-usuario>/enquete-web.git
   cd enquete-web
   
   # Instalar dependências
   npm install
   ```

2. **Configurar a API de Backend**
   - Este projeto precisa da **API Django** (`enquete-api`) rodando localmente.
   - No arquivo `src/environments/environment.ts`, certifique-se de que a apiUrl está apontando para o seu backend (ex: `http://127.0.0.1:8000/api`).
   

3. **Executar o App**  
   ```bash
   ng serve
   ```

---

## 🎯 Funcionalidades Principais

### Gerenciamento de Dados (Services)

A interação com a API é centralizada no EnqueteService para desacoplamento e reutilização.

| Método                | Chamada                          | Descrição                                              |
|-----------------------|----------------------------------|--------------------------------------------------------|
| `getEnquetes()`       | `GET /api/enquetes/`             | Lista todas as enquetes (abertas e fechadas).          |
| `getEnqueteById(id)`  | `GET /api/enquetes/{id}/`        | Detalhes de uma enquete específica.                    |
| `createEnquete(data)` | `POST /api/enquetes/`            | Cria uma nova enquete com `titulo` e `opcoes_input[]`. |
| `votar(...)`          | `POST /api/enquetes/{id}/votar/` | Registra um voto para um `id_participante`.            |

---

## 🧩 Componentização & Rotas

A interface foi dividida em componentes com responsabilidades claras, gerenciados pelo `app.routes.ts`.

| Rota             | Componente                 | Responsabilidade                                                                                                 |
|------------------|----------------------------|------------------------------------------------------------------------------------------------------------------|
| `/`              | **EnqueteListComponent**   | Exibe a lista de enquetes, seu status e votos. Contém o link para "Nova Enquete".                                |
| `/enquetes/:id`  | **EnqueteDetailComponent** | Exibe os detalhes de uma enquete, permite a votação e o re-torno à lista.                                        |
| `/enquetes/nova` | **EnqueteFormComponent**   | Formulário reativo (`Reactive Forms`) para a criação de novas enquetes, com adição e remoção dinâmica de opções. |
| _(global)_       | **NotificationComponent**  | Exibe notificações "toast" de sucesso e erro em toda a aplicação.                                                |
| _(shell)_        | **AppComponent**           | Atua como o contêiner principal com o `<router-outlet>`.                                                         |

---

## 💎 Experiência do Usuário (UX)

- **Notificações "Toast"**: O `NotificationService` exibe feedback não-intrusivo para ações como criação de enquetes e erros de votação.
- **Votação segura**: Os botões são desabilitados e o texto muda para `"Votando..."` durante a requisição para evitar cliques duplos.
- **Destaque do vencedor**: A opção com mais votos recebe um destaque visual na tela de detalhes.
- **Status da enquete**: Um "banner" informa se a enquete está **Fechada** e desabilita os botões de voto. Tags visuais na lista principal também mostram o status.
- **Simulação de multi-usuário**: Um campo de texto para o nome do participante permite testar a regra de "1 voto por usuário" de forma flexível.
- **Navegação limpa**: O `routerLink="/"` no botão **Voltar** garante que o usuário sepre retorne à lista principal, evitando loops no histórico do navegador.

---

## 🚀 Deploy

1. **Backend**: publique o Django (Render, Heroku).
2. **Frontend**:
   - Atualize a `apiURL` no arquivo `src_environments/environment.prod.ts` com a URL do seu backend em produção;
   - Execute o comando de build:
      ```bash
      ng build
      ```
   - Faça o upload do conteúdo da pasta `dist/enquete-web` para um host de sites estáticos (ex: Netlify, Vercel).


3. **CORS**: Lembre-se de atualizar a variável `CORS_ALLOWED_ORIGINS` no seu ambiente de produção do Django 
para incluir a URL do seu frontend online.

---

## 🤝 Contribuição

Contribuições são bem-vindas! Se você quiser sugerir melhorias, relatar bugs ou propor novas funcionalidades, 
sinta-se à vontade para abrir uma issue ou pull request.

---

## 📝 Licença

Distribuído sob a licença **MIT**.

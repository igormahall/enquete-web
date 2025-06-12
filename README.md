# 📝 Frontend (Angular) para Sistema de Enquetes

Este documento resume as etapas lógicas e as decisões de arquitetura tomadas durante a construção da interface de usuário para a **API de Enquetes**.

---

## 1️⃣ Estrutura e Configuração Inicial

O projeto foi iniciado utilizando o **Angular CLI**, com a arquitetura moderna de **Standalone Components**, que simplifica a estrutura de módulos.

- **Comunicação com API:**  
  A comunicação com o backend foi habilitada através da função `provideHttpClient()` no arquivo `app.config.ts`, permitindo o uso do serviço `HttpClient` em toda a aplicação.

- **Estrutura de Pastas:**  
  Para manter o código organizado e escalável, foi adotada a seguinte estrutura dentro de `src/app/`:

  - `models/`: Contém as interfaces TypeScript (`Enquete`, `Opcao`) que definem a "forma" dos dados da API, garantindo a segurança de tipos.
  - `services/`: Centraliza a lógica de acesso à API.
  - `components/`: Armazena os componentes reutilizáveis da UI.

- **CORS:**  
  Foi necessário configurar o backend Django (via `django-cors-headers`) para permitir requisições vindas do servidor de desenvolvimento do Angular:  
  `http://localhost:4200`.

---

## 2️⃣ Consumo da API e Gerenciamento de Dados

A interação com os endpoints do Django foi centralizada no `EnqueteService`.

- `getEnquetes()`:  
  Realiza uma requisição `GET /api/enquetes/` para buscar a lista de todas as enquetes ativas.

- `getEnqueteById(id)`:  
  Realiza uma requisição `GET /api/enquetes/<id>/` para buscar os detalhes de uma única enquete.

- `votar(enqueteId, opcaoId)`:  
  Envia uma requisição `POST /api/enquetes/<id>/votar/` com o `id_opcao` e um `id_participante` gerado e salvo no `localStorage` para simular um usuário persistente e prevenir votos duplicados.

---

## 3️⃣ Componentização e Roteamento

A interface foi dividida em componentes com responsabilidades claras, e o roteamento foi configurado para navegar entre eles.

- **`AppComponent`**  
  Atua como o "casco" principal da aplicação, contendo apenas o `<router-outlet>` para renderizar os componentes das rotas.

- **`EnqueteListComponent`**  
  Página inicial (`path: ''`).  
  Chama o `EnqueteService` para buscar e exibir a lista de enquetes. Cada item da lista é um link (`routerLink`) para a rota de detalhes.

- **`EnqueteDetailComponent`**  
  Página de detalhes (`path: 'enquetes/:id'`).  
  Utiliza o `ActivatedRoute` do Angular para extrair o `:id` da URL, chama o serviço para buscar os dados daquela enquete específica e exibe suas opções.

---

## 4️⃣ Melhorias de Usabilidade (UX)

Para fornecer feedback claro ao usuário, foi implementado um estado de **"carregando"** durante a votação.

- Uma variável booleana `isVoting` foi adicionada ao `EnqueteDetailComponent`.
- Essa variável é ativada (`true`) quando o usuário clica em "Votar" e desativada (`false`) quando a API responde (seja com sucesso ou erro).
- No template HTML:
  - A propriedade `[disabled]` do botão é atrelada a essa variável para prevenir cliques duplos.
  - O texto do botão muda para `"Votando..."` para informar que a ação está em progresso.

---

## 🚀 Próximos Passos Sugeridos

O projeto está funcional, mas pode ser estendido com novas funcionalidades:

- **Link de "Voltar":**  
  Adicionar um botão na página de detalhes para retornar facilmente à lista de enquetes.

- **Formulário de Criação:**  
  Construir um novo componente e rota que permita ao usuário criar novas enquetes através de um formulário (exigiria a criação do endpoint `POST /api/enquetes/` no backend).

- **Feedback de Erro Aprimorado:**  
  Substituir os `alert()`s por um sistema de notificações mais elegante (conhecido como **"toasts"** ou **"snackbars"**).

- **Deploy:**  
  Publicar o backend Django (ex: Heroku, DigitalOcean) e o frontend Angular (ex: Netlify, Vercel, GitHub Pages) para tornar a aplicação acessível na internet.

---

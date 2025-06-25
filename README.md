# 🧪 Pollab — Frontend · [Live Demo](https://pollab-web.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/e0912439-62f7-4432-a787-024ed6293350/deploy-status)](https://pollab-web.netlify.app/)
![Angular](https://img.shields.io/badge/Angular-17-red)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## About Pollab

**Pollab** (short for *Poll Laboratory*) is a modern, open-source polling platform designed to streamline the 
process of gathering opinions and making decisions. Built with **Angular 17** and powered by a **Django REST API**, 
it offers:

- 🧠 Clean and responsive UI 
- ⚙️ Reactive Forms with robust validation
- 🕒 Real-time vote tracking and countdown timers
- 📢 Toast notifications for immediate feedback

Whether you're testing ideas, collecting feedback, or showcasing interactive demos — Pollab lets you create, vote, 
and visualize results in seconds.
> **Join. Experiment. Transform.**
> 
> 👉 Try it now at [pollab-web.netlify.app](https://pollab-web.netlify.app/).

---

## Application Screens

<p align="center">
  <img src="readme_assets/pollab_lista.png" alt="Lista" width="30%"/>
  <img src="readme_assets/pollab_create.png" alt="Criar" width="30%"/>
  <img src="readme_assets/pollab_details.png" alt="Detalhes" width="30%"/>
  <img src="readme_assets/pollab_exception.png" alt="Exception" width="30%"/>
  <img src="readme_assets/pollab_closed.png" alt="Closed" width="30%"/>
</p>

---

## ✨ Overview

| Item                | Details                                              |
|---------------------|------------------------------------------------------|
| **Frontend Stack**  | Angular 17 · TypeScript · RxJS · Vite · Tailwind CSS |
| **Architecture**    | Standalone Components · Services · Feature Folders   |
| **API Source**      | Django REST Framework (`/api/enquetes/…`)            |
| **State Handling**  | `EnqueteService` with RxJS Observables               |
| **Build Command**   | `ng build`                                           |
| **Deployment**      | Hosted via Netlify                                   |

---

## 📂 Folder Structure (`src/app`)

```
src/app
├─ models/        # TypeScript Interfaces (Poll, Option)
├─ services/      # Handles API access and notifications
├─ components/    # UI logic per feature/view
└─ app.routes.ts  # App-wide route configuration
```
---

## ⚙️ Setup Instructions

### 0. Prerequisites

Ensure the following tools are installed on your system:

- [Node.js (LTS ≥ 18.x)](https://nodejs.org/pt/download/current)) (added to `PATH`)
- Angular CLI (≥ 17.x)
  ```bash
  npm install -g @angular/cli
  ```
- [Git](https://git-scm.com/)
- [WebStorm](https://www.jetbrains.com/webstorm/download) or preferred code editor

### 1. Clone and Install Dependencies
```bash
git clone https://github.com/igormahall/pollab-frontend.git
cd pollab-frontend
npm install
```

### 2. Backend API Configuration
   - Ensure that the **Django API** (`pollab-backend`) is running.
   - Update `src/environments/environment.ts`:
      ```ts
      export const environment = {
      production: false,
      apiUrl: 'http://127.0.0.1:8000/api'
      };
      ```
  - Alternatively, point to the deployed backend if available.

### 3. Run the App  
   ```bash
   ng serve
   ```

---

## 🎯 Core Features

### 🗳️ Dinamic Voting
- Visualize vote counts in real time
- Leading option is visually highlighted
- Voting disabled after submission or poll expiration

### 🧾 Pool Creation
- Reactive form with client-side validation
  - Title ≥ 5 characters
  - 2–10 options
  - Custom expiration in hours
- Options are dynamically managed (add/remove)

### 🔔 Toast Notifications
- Centralized via `NotificationService`
- Styled toast alerts (success/failure) via `NotificationComponent`

### ⏳ Countdown Timer
- Live countdown for each pool
- Warning styles when under 5 minutes

---

## 🧩 API Integration

API interaction is encapsulated in `EnqueteService`.

| Method              | Endpoint                          | Description                                          |
|---------------------|-----------------------------------|------------------------------------------------------|
| `getEnquetes()`     | `GET /api/enquetes/`              | Lists all polls                                      |
| `getEnqueteById()`  | `GET /api/enquetes/{id}/`         | Retrieves specific poll data                         |
| `createEnquete()`   | `POST /api/enquetes/`             | Creates a poll with title, duration, options         |
| `votar(...)`        | `POST /api/enquetes/{id}/votar/`  | Submits a vote with `id_opcao` and `id_participante` |

---

## 🚦 Routing Overview

The UI is composed of focused components mapped by `app.routes.ts`.

| Route             | Component                 | Purpose                                                                                       |
|-------------------|---------------------------|-----------------------------------------------------------------------------------------------|
| `/`               | `EnqueteListComponent`    | Shows all polls with quick access to creation                                      |
| `/enquetes/:id`   | `EnqueteDetailComponent`  | Vote on and view details of a selected poll                              |
| `/enquetes/nova`  | `EnqueteFormComponent`    | Form interface for creating new polls                               |
| _(global)_        | `NotificationComponent`   | Displays toast notifications across the app                                                     |
| _(shell)_         | `AppComponent`            | Root layout including `<router-outlet>`.                                                       |
---

## 💎 UX Highlights

- **Intelligent Toasts** — User-friendly feedback on success/failure
- **Vote Safety** — Prevents double submissions and errors
- **Option Highlighting** — Top-voted option stands out visually
- **Poll Status Labels** — "Closed" banners with disabled inputs
- **Simulated Users** — Voter ID field simulates multi-user behavior
- **Smooth Navigation** — Back navigation returns safely to the main list

---

## 🚀 Deployment Guide

1. **Backend**
   - Deploy Django API (e.g., Render, Railway, Heroku)


2. **Frontend**
  - Update `src/environments/environment.prod.ts`:
    ```ts
    export const environment = {
      production: true,
      apiUrl: 'https://your-backend-url/api'
    };
    ```
  - Build and deploy:
    ```bash
    ng build
    ```
  - Upload the output from `dist/pollab-frontend` to any static host (e.g. Netlify)

3. **Django CORS**
   - Add the frontend domain to `CORS_ALLOWED_ORIGINS` in your Django settings

---

## 🤝 Contributing

All contributions are welcome!

Open an issue or submit a pull request to suggest features, fixes, or enhancements.

---

## 📝 License

Released under the **MIT** license.

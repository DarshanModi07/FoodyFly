<h1 align="center">🍔 FoodyFly</h1>
<p align="center">
  <strong>Modern food ordering + restaurant discovery — built with MERN, AI chat, and payments.</strong>
</p>

<p align="center">
  <a href="https://github.com/darshan-tech/foodyfly/actions"><img src="https://img.shields.io/github/actions/workflow/status/darshan-tech/foodyfly/nodejs.yml?branch=main&style=for-the-badge" alt="CI" /></a>
  <a href="https://github.com/darshan-tech/foodyfly"><img src="https://img.shields.io/github/license/darshan-tech/foodyfly?style=for-the-badge" alt="License" /></a>
  <a href="https://github.com/darshan-tech/foodyfly/issues"><img src="https://img.shields.io/github/issues/darshan-tech/foodyfly?style=for-the-badge" alt="Issues" /></a>
  <a href="https://github.com/darshan-tech/foodyfly/stargazers"><img src="https://img.shields.io/github/stars/darshan-tech/foodyfly?style=for-the-badge" alt="Stars" /></a>
</p>

---

<p align="center">
  <img src="https://via.placeholder.com/900x250.png?text=FoodyFly+%F0%9F%8D%94+Food+Delivery+%26+Discovery" alt="FoodyFly banner" />
</p>

> **FoodyFly** is a full-stack food discovery & delivery platform where customers browse restaurants, order meals, pay securely, and even ask an AI assistant for recommendations — all backed by role-based dashboards for Owners and Admins.

---

## 🚀 Overview

FoodyFly is a modern **MERN** (MongoDB, Express, React, Node.js) application designed for an end-to-end food ordering experience:

- Customers browse restaurants, add items to cart, and checkout with Stripe.
- Owners manage menus, track orders, and view basic analytics.
- Admins moderate listings, users, and monitor platform activity.
- A built-in AI assistant helps users explore menus and get food recommendations.

---

## 🧱 Tech Stack

### Frontend

- **React** (v19)
- **Redux Toolkit** for global state
- **Tailwind CSS** for styling
- **Parcel** for bundling
- **Axios** for API calls
- **Google OAuth** for login
- **Stripe** for payments

### Backend

- **Node.js + Express.js** REST API
- **MongoDB** & **Mongoose** for data storage
- **JWT Authentication** (cookies-based)
- **Passport Google OAuth 2.0**
- **Stripe** payments
- **AI Chat** via Google Generative AI & OpenAI

---

## 🌟 Core Features

- ✅ **User Authentication** (email/password + Google OAuth)
- ✅ **Food browsing** with restaurant menus
- ✅ **Cart + checkout** with Stripe
- ✅ **Order management** (history + tracking)
- ✅ **AI chatbot assistant** (recommendations + help)
- ✅ **Role-based dashboards** (User / Owner / Admin)
- ✅ **JWT + cookie-based** secure sessions

---

## 👥 User Roles

### 🧑‍🍳 User (Customer)

- Browse restaurants & menu items
- Add/remove items to cart
- Place orders and pay securely
- Chat with AI assistant for recommendations

### 🏪 Owner (Restaurant)

- Manage menu items (create/edit/delete)
- Track incoming orders and status
- View simple analytics + inventory

### 🛡️ Admin (Platform)

- Monitor platform activity
- Manage restaurants and menus
- Moderate users
- Control system settings

---

## 🏗️ Architecture

```
Frontend (React + Redux)
   ↓ Axios / fetch
API (Express REST) → Auth + Roles + Payments + AI
   ↓
Backend (Node.js + Express)
   ↓
Database (MongoDB via Mongoose)
```

### 🧠 AI Chat + Recommendations

`/api/genai` powers the chatbot assistant with Google Generative AI + OpenAI models.

---

## 📁 Folder Structure

```
FoodyFly
├── Frontend
│   ├── src
│   │   ├── components
│   │   ├── utils
│   │   └── App.js
│   └── index.html
└── Backend
    ├── src
    │   ├── app.js
    │   ├── Routes
    │   ├── controllers
    │   ├── middleware
    │   └── models
    └── config
```

---

## 🛠️ Installation

### 1) Backend (API)

```bash
cd Backend
npm install
```

Create a `.env` file (see below) and then:

```bash
npm run nodemon
```

### 2) Frontend (Client)

```bash
cd Frontend
npm install
npm start
```

> The frontend expects the backend API to run on **http://localhost:7777** by default.

---

## 🔐 Environment Variables

Create a `.env` file in both `Backend/` and `Frontend/` (if needed). Keys used in the project include:

### Backend (`Backend/.env`)

- `CONN_STRING` — MongoDB connection string (MongoDB Atlas URI)
- `JWT_SECRET` — Secret key for JWT signing
- `GOOGLE_CLIENT_ID` — Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` — Google OAuth client secret
- `STRIPE_SECRET_KEY` — Stripe secret key
- `OPENAI_API_KEY` — OpenAI API key (if using OpenAI)
- `GOOGLE_API_KEY` — Google Generative AI / GenAI key

### Frontend (`Frontend/.env`)

- `VITE_API_URL` (optional) — override the default API base URL

> 💡 Tip: For local dev, backend is configured to allow `http://localhost:1234` (Parcel dev server).

---

## 🚀 Deployment

### Frontend (Recommended)

Deploy on **Vercel** (or Netlify) from the `Frontend/` folder.

### Backend (Recommended)

Deploy on **Render** (or Heroku / Fly) from the `Backend/` folder.

### Database

Use **MongoDB Atlas** for production-grade hosted MongoDB.

---

## 📄 Notes & Next Steps

- Swap hard-coded CORS origins for environment-driven values before production.
- Enable HTTPS and set `secure: true` on cookies in production.
- Add tests and CI workflows for build/test automation.

---

<p align="center">Made with ❤️ and 🍕 by Darshan</p>

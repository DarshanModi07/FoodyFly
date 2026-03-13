<div align="center">

<img src="https://img.shields.io/badge/FoodyFly-Food%20Ordering%20Platform-4a7ac3?style=for-the-badge&logo=react&logoColor=white" alt="FoodyFly" />

# 🍔 FoodyFly
### *Order smarter. Eat better. Fly faster.*

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe)](https://stripe.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

<br/>

> A full-stack food ordering platform with role-based dashboards, AI assistant, real-time cart, and Stripe payments — built for users, restaurant owners, and admins.

</div>

---

## 📖 Overview

**FoodyFly** is a production-ready MERN stack food delivery web application. Users can browse restaurants, add items to cart, and pay securely. Restaurant owners can manage their menus and track incoming orders. Admins oversee the entire platform — approving restaurants, monitoring users, and managing operations.

---

## ⚡ Tech Stack

<details>
<summary><b>🖥️ Frontend</b></summary>

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Redux | Global state management |
| Tailwind CSS | Utility-first styling |
| Parcel | Bundler |
| Axios | HTTP client |
| React Router v6 | Client-side routing |
| Stripe.js | Payment integration |
| React Hot Toast | Notifications |

</details>

<details>
<summary><b>🛠️ Backend</b></summary>

| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT + Cookies | Authentication |
| Passport.js | Google OAuth 2.0 |
| bcrypt | Password hashing |
| Stripe | Payment processing |
| OpenRouter AI | AI chatbot (Llama 3.2) |

</details>

---

## ✨ Core Features

- 🔐 **Authentication** — JWT-based login/signup + Google OAuth
- 🍽️ **Food Browsing** — Browse restaurants with search, filters, and categories
- 🛒 **Cart System** — Add/remove items with real-time quantity and price updates
- 💳 **Stripe Payments** — Secure checkout with order confirmation on success
- 🤖 **AI Chatbot** — FoodyBot powered by Llama 3.2 recommends restaurants
- 📊 **Role-Based Dashboards** — Separate views for Users, Owners, and Admins
- 🌙 **Dark Mode** — Full dark/light theme support across all views
- 📱 **Responsive Design** — Fully mobile-friendly UI

---

## 👥 User Roles

<details>
<summary><b>🙋 User</b></summary>

- Browse restaurants and menus
- Add items to cart / remove items
- Place orders with Stripe payment
- Chat with FoodyBot AI assistant
- View order history and profile

</details>

<details>
<summary><b>👨‍🍳 Restaurant Owner</b></summary>

- Register and manage restaurant details
- Add / edit / delete menu items by category
- View incoming orders with customer details
- Mark orders as delivered
- Track approval status from admin

</details>

<details>
<summary><b>🛡️ Admin</b></summary>

- Dashboard with platform-wide stats
- Approve or reject restaurants
- View all approved restaurants and their menus
- Manage users and restaurant owners
- Delete accounts or restaurants

</details>

---

## 🏗️ Architecture

```
Browser (React + Parcel)
        │
        │  HTTP / REST (Axios + Cookies)
        ▼
Express.js API Server (Node.js)
        │
   ┌────┴─────┐
   │          │
MongoDB    External APIs
(Atlas)    ├── Stripe (payments)
           ├── Google OAuth (passport)
           └── OpenRouter (AI chatbot)
```

---

## 📁 Folder Structure

```
FoodyFly/
│
├── Frontend/
│   ├── src/
│   │   ├── components/       # All React components
│   │   │   ├── User/         # Header, Cart, Feed, RestroCard...
│   │   │   ├── Owner/        # OwnerDashboard, OwnerOrders...
│   │   │   └── Admin/        # AdminOverview, AdminUsers...
│   │   ├── redux/            # Redux store & slices
│   │   ├── utils/            # Constants, stripe.js
│   │   └── App.js            # Routes
│   └── .env
│
└── Backend/
    ├── config/               # DB connection, Passport
    ├── middleware/            # JWT auth (Checking.js)
    ├── models/               # Mongoose schemas
    │   ├── userData.js
    │   ├── restroInfo.js
    │   ├── resMenu.js
    │   └── orderInfo.js
    ├── Routes/               # Express routers
    │   ├── auth.js
    │   ├── order.js
    │   ├── owner.js
    │   ├── admin.js
    │   ├── payment.js
    │   └── Genai.js
    ├── app.js
    └── .env
```

---

## 🚀 Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Stripe account
- Google Cloud Console project (for OAuth)
- OpenRouter API key

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/FoodyFly.git
cd FoodyFly
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create `.env` in the Backend folder:

```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/foofyfly
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
OPENROUTER_KEY=sk-or-xxxxxxxxxxxx
GOOGLE_CLIENT_ID=xxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxx
GOOGLE_CALLBACK_URL=http://localhost:7777/auth/google/callback
CLIENT_URL=http://localhost:1234
NODE_ENV=development
```

```bash
node app.js
# Server runs on http://localhost:7777
```

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

Create `.env` in the Frontend folder:

```env
BASE_URL=http://localhost:7777/
STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxx
LOGO_URL=https://your-logo-url.com/logo.png
```

```bash
npx parcel src/index.html
# App runs on http://localhost:1234
```

---

## 🌍 Deployment

| Layer | Platform | Notes |
|---|---|---|
| Frontend | **Vercel** | Set env vars in dashboard |
| Backend | **Render** | Free tier spins down after inactivity |
| Database | **MongoDB Atlas** | Free M0 cluster available |

### After deploying, update these:

- `CORS origin` in `app.js` → your Vercel URL
- `GOOGLE_CALLBACK_URL` in Render env → your Render backend URL
- Update Google Cloud Console → Authorized redirect URIs
- `CLIENT_URL` in Render env → your Vercel URL

---

## 🔑 Environment Variables Summary

| Variable | Where | Description |
|---|---|---|
| `MONGO_URI` | Backend | MongoDB connection string |
| `JWT_SECRET` | Backend | Secret for JWT signing |
| `STRIPE_SECRET_KEY` | Backend | Stripe secret key (`sk_test_...`) |
| `OPENROUTER_KEY` | Backend | OpenRouter API key |
| `GOOGLE_CLIENT_ID` | Backend | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Backend | Google OAuth secret |
| `CLIENT_URL` | Backend | Frontend URL for Stripe redirects |
| `BASE_URL` | Frontend | Backend API base URL (with trailing `/`) |
| `STRIPE_PUBLIC_KEY` | Frontend | Stripe publishable key (`pk_test_...`) |

---

<div align="center">

Made with ❤️ by **Darshan Modi**

⭐ Star this repo if you found it helpful!

</div>
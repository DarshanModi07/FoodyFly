# 🍽️ FoodyFly - Food Ordering Platform

<div align="center">

**A Modern, Fully Responsive Food Ordering & Restaurant Discovery Platform**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.17-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.11.1-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)
[![React Router](https://img.shields.io/badge/React%20Router-6.28.0-F00000?style=flat-square&logo=react-router)](https://reactrouter.com/)
[![Jest](https://img.shields.io/badge/Jest-30.2.0-C21325?style=flat-square&logo=jest)](https://jestjs.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#license)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=flat-square)](#)

[Quick Start](#quick-start) • [Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Structure](#-project-structure) • [Contributing](#-contributing) • [License](#license)

</div>

---

## 📌 About

**FoodyFly** is a production-ready food ordering and restaurant discovery platform built with modern web technologies. It provides a seamless user experience for browsing restaurants, exploring menus, and managing shopping carts with full responsiveness across all devices.

### Key Highlights

- 📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
- 🎨 **Modern UI** - Beautiful design with dark mode support
- ⚡ **Fast Performance** - Code splitting and lazy loading
- 🧪 **Well Tested** - Jest unit tests included
- 📚 **Clean Code** - Organized folder structure

---

## ✨ Features

### 🛍️ Core Features

- **Restaurant Discovery** - Browse restaurants with ratings and cuisines
- **Menu Exploration** - View organized menu categories and items
- **Smart Search** - Real-time search for restaurants and dishes
- **Shopping Cart** - Add/remove items with Redux state management
- **Infinite Scroll** - Lazy load more restaurants as you scroll
- **Restaurant Details** - View ratings, pricing, and cuisine info

### 🎨 UI/UX Features

- **Dark Mode** - Toggle light/dark themes with persistence
- **Responsive Design** - Mobile-first using Tailwind CSS
- **Skeleton Loading** - Beautiful loading states
- **Error Handling** - Graceful error pages
- **Smooth Animations** - Elegant transitions and effects
- **Accessibility** - Semantic HTML and keyboard navigation

### 📱 Responsiveness

| Device      | Breakpoint | Experience                        |
| ----------- | ---------- | --------------------------------- |
| **Mobile**  | < 640px    | Single column, touch-optimized    |
| **Tablet**  | 640-1024px | Two columns, adaptive layout      |
| **Desktop** | > 1024px   | Multi-column grids, full features |

---

## 🛠 Tech Stack

**Frontend**: React 19.2.0, React Router 6.28.0  
**State Management**: Redux Toolkit 2.11.1  
**Styling**: Tailwind CSS 4.1.17, PostCSS  
**Testing**: Jest 30.2.0, React Testing Library  
**Build Tool**: Parcel 2.16.0  
**Compiler**: Babel 7.28.5

---

## 🚀 Quick Start

### Prerequisites

- Node.js v18 or higher
- npm 9 or higher

### Installation

```bash
# Clone repository
git clone https://github.com/darshan-tech/foodyfly.git
cd foodyfly

# Install dependencies
npm install

# Start development server
npm start
```

The app opens at `http://localhost:1234`

---

## 📦 Installation & Setup

### Automated Setup (Recommended)

**Windows:**

```bash
scripts\setup.bat
```

**macOS/Linux:**

```bash
bash scripts/setup.sh
```

### Manual Setup

```bash
# Install dependencies
npm install

# Create .env file (optional)
cp .env.example .env

# Start dev server
npm start
```

---

## 📝 Available Scripts

```bash
npm start              # Start development server
npm test               # Run Jest tests
npm test:coverage      # Run tests with coverage
npm test:watch         # Run tests in watch mode
npm run build          # Build production bundle
npm run clean          # Clean build files
```

---

## 📂 Project Structure

```
foodyfly/
│
├── 🔧 config/                    # Configuration files
│   ├── babel.config.js
│   ├── jest.config.js
│   ├── tailwind.config.js
│   ├── .postcssrc
│   ├── .parcelrc
│   └── .editorconfig
│
├── 📦 public/                    # Static assets
│   ├── dishes.json
│   ├── restroInfo.json
│   └── Assets/
│
├── 💻 src/                       # Application code
│   ├── App.js
│   ├── index.css
│   ├── components/               # 14 React components
│   │   ├── Header.jsx
│   │   ├── Body.jsx
│   │   ├── Cart.jsx
│   │   ├── Contact.jsx
│   │   ├── RestroCard.jsx
│   │   └── ... (9 more)
│   └── utils/                    # 4 custom hooks
│       ├── constant.jsx
│       ├── useOnlineStatus.jsx
│       ├── useResrtoMenu.jsx
│       └── UserContext.jsx
│
├── ♻️ redux/                      # State management
│   ├── appStore.jsx
│   └── cartSlice.jsx
│
├── 🧪 __test__/                  # Test files
│   ├── header.test.js
│   ├── contact.test.js
│   └── coverage/
│
├── 🔧 scripts/                   # Setup scripts
│   ├── setup.sh
│   └── setup.bat
│
├── 📱 .github/                   # GitHub templates
│   ├── workflows/ci.yml
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
│
├── package.json
├── index.html
├── LICENSE
└── README.md
```

---

## 🏗️ Architecture

### Component Structure

- **Container Components**: Body, Cart (manage state)
- **Presentational Components**: Cards, Items, Headers (display data)
- **Layout Components**: Header, Footer (page structure)
- **Utility Components**: Loading, Error, ThemeToggle

### State Management

Redux Toolkit manages:

- **Cart State**: Items, quantities, total price
- **Global Settings**: Theme preferences

### Custom Hooks

- `useOnlineStatus()` - Detect network connectivity
- `useResrtoMenu()` - Fetch restaurant menu data
- `useContext()` - Access user information

---

## 🚀 GitHub Push Guide

### 1. Initialize Git

```bash
git init
git add .
git commit -m "initial commit: FoodyFly food ordering platform"
```

### 2. Create GitHub Repository

- Visit [github.com/new](https://github.com/new)
- Name: `foodyfly`
- **Do NOT** initialize with README/gitignore

### 3. Connect & Push

```bash
git remote add origin https://github.com/YOUR_USERNAME/foodyfly.git
git branch -M main
git push -u origin main
```

### 4. Create Development Branch

```bash
git checkout -b develop
git push -u origin develop
```

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Test Files

- `__test__/header.test.js` - Header & navigation tests
- `__test__/contact.test.js` - Contact form tests

---

## 📊 Performance

- ✅ **Code Splitting** - Lazy load routes
- ✅ **Infinite Scroll** - Efficient pagination
- ✅ **Skeleton Loading** - Better UX
- ✅ **Production Build** - Optimized bundle

---

## 🔐 Security

- ✅ No sensitive data in code
- ✅ Environment variables for secrets
- ✅ XSS protection via React
- ✅ Git attributes for line endings

---

## 🌐 Browser Support

| Browser | Status  | Version     |
| ------- | ------- | ----------- |
| Chrome  | ✅ Full | Latest 2    |
| Firefox | ✅ Full | Latest 2    |
| Safari  | ✅ Full | Latest 2    |
| Edge    | ✅ Full | Latest 2    |
| Mobile  | ✅ Full | iOS/Android |

---

## 🤝 Contributing

### How to Contribute

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use ES6+ syntax
- Follow component patterns
- Add comments for complex logic
- Test your changes
- Keep components focused

---

## 📜 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file.

---

## 👨‍💻 Author

**Darshan**

- GitHub: [@darshan-tech](https://github.com/darshan-tech)
- Project: [FoodyFly](https://github.com/darshan-tech/foodyfly)

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Parcel](https://parceljs.org/) - Bundler
- [Jest](https://jestjs.io/) - Testing framework

---

## 📞 Support

- 🐛 Report bugs: [GitHub Issues](https://github.com/darshan-tech/foodyfly/issues)
- 💬 Discuss: [GitHub Discussions](https://github.com/darshan-tech/foodyfly/discussions)
- 📧 Email: support@foodyfly.dev

---

## 🎯 Future Enhancements

- [ ] User authentication & profiles
- [ ] Payment gateway integration
- [ ] Order tracking & history
- [ ] Restaurant reviews & ratings
- [ ] Favorites/Wishlist
- [ ] Real-time notifications
- [ ] Admin dashboard
- [ ] Mobile app (React Native)
- [ ] Backend API (Node.js/Express)

---

<div align="center">

### ⭐ If you like this project, please give it a star!

**Made with ❤️ by Darshan**

[⬆ Back to top](#-foodyfly---food-ordering-platform)

</div>

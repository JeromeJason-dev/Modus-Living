# Modus Living

A modern furniture & home-living e-commerce storefront built with React and Vite. Browse products, filter and search, manage a cart, and check out through a clean, minimal shopping experience.

## Features

- **Product catalog** — browse a grid of products with images, pricing, and ratings
- **Search & filter** — filter by category, search by keyword, and sort by price or rating
- **Product details** — dedicated page per product with full description
- **Shopping cart** — add/remove items, update quantities, persisted in `localStorage`
- **Authentication** — demo email/password login gating access to checkout
- **Checkout flow** — protected route available only to logged-in users
- **Polished UI** — built with shadcn/ui components and Tailwind CSS v4

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router v7 |
| Styling | Tailwind CSS  |
| UI Components | shadcn/ui + Radix UI |
| Icons | lucide-react |
| State Management | React Context API (`AuthContext`, `CartContext`, `FilterContext`) |
| Linting | ESLint |
| Data Source | Fake Store API |

## Project Structure

```
Modus-Living/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui primitives (button, card, input, badge, label)
│   │   ├── Navbar.jsx        # Site navigation + cart indicator
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx   # Single product preview card
│   │   ├── ProductList.jsx   # Product grid + data fetching hook
│   │   ├── SearchFilter.jsx  # Search/filter/sort controls
│   │   ├── ProtectedRoute.jsx# Route guard for authenticated pages
│   │   ├── ErrorMessage.jsx
│   │   └── Loader.jsx
│   ├── context/
│   │   ├── AuthContext.jsx   # Demo authentication (localStorage-backed)
│   │   ├── CartContext.jsx   # Cart state (add/remove/update, localStorage-backed)
│   │   └── FilterContext.jsx # Search/category/sort state
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx      # Protected route
│   │   └── Login.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── App.jsx                # Route definitions
│   ├── main.jsx                # App entry point
│   └── index.css
├── components.json             # shadcn/ui config
├── vite.config.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/JeromeJason-dev/Modus-Living.git
cd Modus-Living

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

This starts the Vite dev server (by default at `http://localhost:5173`) with hot module reloading.

### Build

```bash
npm run build
```

Bundles the app for production into the `dist/` folder.

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Usage Notes

- **Products** are fetched live from the public [Fake Store API](https://fakestoreapi.com/products), so catalog data isn't stored in this repo.
- **Authentication** is a demo-only implementation — any well-formed email/password combination will log you in. Swap `AuthContext.jsx` for a real API integration to use this in production.
- **Cart and session state** persist across page reloads via the browser's `localStorage`.
- **Checkout** (`/checkout`) is a protected route — you must be logged in to access it; otherwise you'll be redirected.

## Deployment

The project is deployed on [Vercel](https://vercel.com). Since it's a static Vite build, it can also be deployed to any static host (Netlify, GitHub Pages, Cloudflare Pages, etc.) by running `npm run build` and serving the `dist/` directory.

## License

This project is licensed under the **MIT License.**

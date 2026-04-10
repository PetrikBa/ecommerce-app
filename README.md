# Ecommerce App Monorepo

A modern e-commerce project built as a **monorepo** using `pnpm workspaces` and `Turborepo`.
The repository includes a customer-facing storefront, an admin dashboard, and separate backend services for products, orders, and payments.

---

## 🧱 Monorepo Architecture

The project is organized as a **monorepo**, which means multiple applications and shared configurations are managed in a single repository.

| Part | Description |
| --- | --- |
| `apps/client` | customer-facing e-commerce frontend |
| `apps/admin` | admin panel for content management and analytics overview |
| `apps/product-service` | product API service built with `Express` |
| `apps/order-service` | order service built with `Fastify` |
| `apps/payment-service` | payment service built with `Hono` |
| `packages/eslint-config` | shared ESLint configuration |
| `packages/typescript-config` | shared TypeScript configuration |

---

## 🛠️ Technologies Used

### Core / Tooling
- `pnpm` + `pnpm workspaces`
- `Turborepo`
- `TypeScript`
- `ESLint`
- `Prettier`

### Frontend
- `Next.js 16`
- `React 19`
- `Tailwind CSS 4`
- `shadcn/ui` and `Radix UI`
- `lucide-react`
- `React Hook Form`
- `Zod` for form validation
- `Clerk` for user authentication
- `Zustand` for cart state management and persistence
- `Recharts` for admin dashboard charts
- `TanStack Table` for tables and data grids

### Backend / API Services
- `Express` (`product-service`)
- `Fastify` (`order-service`)
- `Hono` (`payment-service`)
- `CORS` for communication between services and frontend apps

---

## ✨ Main Features

### Customer App (`client`)
- product listing on the homepage
- product filtering by category
- product detail page with size and color variants
- shopping cart with persisted state via `Zustand persist`
- sign in and sign up with `Clerk`
- checkout / payment form with validation

### Admin App (`admin`)
- dashboard with statistics and charts
- tables for **products**, **users**, and **payments**
- forms and UI components for adding / editing entities
- overview of recent transactions and popular products
- responsive interface built with modern UI components

### Services
- dedicated health-check endpoints for each service
- separated architecture for products, orders, and payments
- easier scalability and maintenance thanks to multiple isolated apps

---

## 🚀 Running the Project

### Requirements
- `Node.js >= 18`
- `pnpm >= 9`

### Installation
```bash
pnpm install
```

### Run the entire monorepo
```bash
pnpm dev
```

### Run individual apps
```bash
pnpm --filter client dev
pnpm --filter admin dev
pnpm --filter product-service dev
pnpm --filter order-service dev
pnpm --filter payment-service dev
```

### Default Ports
| Service | Port |
| --- | --- |
| `client` | `3002` |
| `admin` | `3003` |
| `product-service` | `8000` |
| `order-service` | `8001` |
| `payment-service` | `8002` |

---

## 📦 Useful Scripts

```bash
pnpm dev          # runs all apps via Turborepo
pnpm build        # builds all packages
pnpm lint         # runs lint across the monorepo
pnpm check-types  # TypeScript type-check
pnpm format       # formats project files
```

---

## 📌 Summary

This project is a **full-stack e-commerce monorepo** that combines a modern frontend stack (`Next.js`, `React`, `Tailwind`) with separated backend services (`Express`, `Fastify`, `Hono`).
Thanks to the monorepo architecture, apps and shared configurations are managed clearly in one place.

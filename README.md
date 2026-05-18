# Ecommerce App Monorepo

A modern e-commerce project built as a **monorepo** using `pnpm workspaces` and `Turborepo`.
The repository includes a customer-facing storefront, an admin dashboard, and separate backend microservices for authentication, products, orders, payments, and email notifications — connected via an Apache Kafka event bus.

---

## 🧱 Monorepo Architecture

The project is organized as a **monorepo**, which means multiple applications and shared packages are managed in a single repository.

| Part | Description |
| --- | --- |
| `apps/client` | Customer-facing e-commerce frontend (Next.js) |
| `apps/admin` | Admin panel for content management and analytics (Next.js) |
| `apps/auth-service` | Authentication service built with `Express` + `Clerk` |
| `apps/product-service` | Product API service built with `Express` |
| `apps/order-service` | Order service built with `Fastify` |
| `apps/payment-service` | Payment service built with `Hono` + `Stripe` |
| `apps/email-service` | Email notification service built with `Nodemailer` |
| `packages/kafka` | Shared Kafka client (producer/consumer) powered by `KafkaJS` |
| `packages/product-db` | Shared Prisma client for PostgreSQL (products & categories) |
| `packages/order-db` | Shared Mongoose client for MongoDB (orders) |
| `packages/types` | Shared TypeScript types and Zod schemas |
| `packages/eslint-config` | Shared ESLint configuration |
| `packages/typescript-config` | Shared TypeScript configuration |

---

## 🛠️ Technologies Used

### Core / Tooling
- `pnpm` + `pnpm workspaces`
- `Turborepo`
- `TypeScript`
- `ESLint`
- `Prettier`
- `tsx` — TypeScript execution and watch mode for Node.js services

### Frontend — Client (`apps/client`)
- `Next.js 16` with Turbopack
- `React 19`
- `Tailwind CSS 4`
- `shadcn/ui` and `Radix UI` — accessible component primitives
- `lucide-react` — icon library
- `React Hook Form` + `@hookform/resolvers` — form state management
- `Zod` — schema validation
- `Clerk` (`@clerk/nextjs`) — authentication and session management
- `Zustand` — cart state management with persistence
- `Stripe` (`@stripe/react-stripe-js`, `@stripe/stripe-js`) — payment UI integration
- `Embla Carousel` — product image carousel
- `react-toastify` — toast notifications
- `clsx` + `tailwind-merge` — conditional class utilities

### Frontend — Admin (`apps/admin`)
- `Next.js 16` with Turbopack
- `React 19`
- `Tailwind CSS 4`
- `shadcn/ui` and `Radix UI` — accessible component primitives
- `lucide-react` — icon library
- `TanStack Table` — data tables and grids
- `TanStack Query` — server-state management and data fetching
- `Recharts` — dashboard charts and analytics
- `React Hook Form` + `Zod` — form handling and validation
- `Clerk` (`@clerk/nextjs`) — authentication
- `next-themes` — dark/light theme support
- `sonner` — toast notifications
- `date-fns` — date formatting utilities
- `react-day-picker` — date picker component

### Backend / Microservices

| Service | Framework | Auth | Notes |
| --- | --- | --- | --- |
| `auth-service` | Express 5 | Clerk (`@clerk/express`) | Webhook handling, user events |
| `product-service` | Express 5 | Clerk (`@clerk/express`) | CRUD for products and categories |
| `order-service` | Fastify 5 | Clerk (`@clerk/fastify`) | Order creation and management |
| `payment-service` | Hono | Clerk (`@clerk/hono`) | Stripe checkout and webhooks |
| `email-service` | — | — | Kafka consumer, sends emails via Nodemailer |

### Databases

| Package | Database | ORM / Driver |
| --- | --- | --- |
| `packages/product-db` | PostgreSQL | Prisma 7 (`@prisma/client`, `@prisma/adapter-pg`) |
| `packages/order-db` | MongoDB | Mongoose 9 |

### Messaging / Event Bus
- `Apache Kafka` (KRaft mode, 3-broker cluster) — event-driven communication between services
- `KafkaJS` — Kafka client for Node.js
- `Docker` + `Docker Compose` — Kafka broker infrastructure

---

## ✨ Main Features

### Customer App (`client`)
- Product listing on the homepage
- Product filtering by category
- Product detail page with size and color variants
- Shopping cart with persisted state via `Zustand persist`
- Sign in and sign up with `Clerk`
- Stripe-powered checkout and payment flow

### Admin App (`admin`)
- Dashboard with statistics and charts (`Recharts`)
- Data tables for **products**, **users**, **orders**, and **payments** (`TanStack Table`)
- Forms and UI components for adding and editing entities
- Overview of recent transactions and popular products
- Dark/light theme toggle (`next-themes`)
- Responsive interface built with modern UI components

### Microservices
- Event-driven architecture via Apache Kafka (KRaft, 3 brokers)
- `auth-service` — processes user lifecycle events from Clerk webhooks
- `product-service` — manages products and categories stored in PostgreSQL via Prisma
- `order-service` — handles orders stored in MongoDB via Mongoose
- `payment-service` — integrates Stripe for payments; syncs product catalog to Stripe
- `email-service` — listens to Kafka topics and sends transactional emails via Nodemailer
- Health-check endpoints on every service
- Shared type definitions and Zod schemas across the entire monorepo

---

## 🚀 Running the Project

### Requirements
- `Node.js >= 18`
- `pnpm >= 9`
- `Docker` (for Kafka)

### Installation
```bash
pnpm install
```

### Start Kafka (Docker)
```bash
cd packages/kafka
docker compose up -d
```

### Database setup (product-db / PostgreSQL)
```bash
pnpm --filter @repo/product-db db:migrate
pnpm --filter @repo/product-db db:generate
```

### Run the entire monorepo
```bash
pnpm dev
```

### Run individual apps
```bash
pnpm --filter client dev
pnpm --filter admin dev
pnpm --filter auth-service dev
pnpm --filter product-service dev
pnpm --filter order-service dev
pnpm --filter payment-service dev
pnpm --filter email-service dev
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

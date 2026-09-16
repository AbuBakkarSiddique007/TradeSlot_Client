# TradeSlot Client

Frontend web application for **TradeSlot** — a chat-driven booking platform where customers book a local trader's service slots and pay online through an in-page chat widget.

- **Live app:** https://trade-slot-theta.vercel.app
- **Repository:** https://github.com/AbuBakkarSiddique007/TradeSlot_Client
- **Backend API:** https://github.com/AbuBakkarSiddique007/TradeSlot_Server

---

## Features

- **In-page chat widget** on every page — customers describe the job, pick an available slot (date + time chips), enter contact details, and pay via Stripe Checkout without leaving the site.
- **Public marketing pages** — home, features, how-it-works, pricing, about, contact, terms & privacy.
- **Trader dashboard** (protected):
  - Daily schedule with booking statuses
  - Work-area zones and availability management
  - Stripe Connect onboarding + payout status
  - Profile and working-hours settings
- **JWT authentication** — register, login, protected `/dashboard` routes.
- Fully responsive Tailwind 4 UI with dark mode styling.

## Tech Stack

| Layer      | Technology                                   |
| ---------- | -------------------------------------------- |
| Framework  | Next.js 16 (App Router)                      |
| UI         | React 19, TypeScript                         |
| Styling    | Tailwind CSS 4 (CSS-first config)            |
| Data       | Axios (`useAxiosSecure`), react-hook-form    |
| Notify     | sweetalert2                                  |
| Icons      | lucide-react                                 |
| Package    | pnpm                                         |

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+

### 1. Install

```bash
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Set `NEXT_PUBLIC_API_URL` to your API base URL:

| File              | Value                                                  | Used for        |
| ----------------- | ------------------------------------------------------ | --------------- |
| `.env.local`      | `http://localhost:5000/api/v1`                         | `pnpm dev`      |
| `.env.production` | `https://tradeslot-server.onrender.com/api/v1`         | production build |

### 3. Run

```bash
pnpm dev        # http://localhost:3000
```

Other scripts:

| Command       | Description            |
| ------------- | ---------------------- |
| `pnpm build`  | Production build       |
| `pnpm start`  | Serve production build |
| `pnpm lint`   | ESLint (Next config)   |

## Project Structure

```text
src/
  proxy.ts                  # Route guard: redirects /dashboard to /login without a token cookie
  app/
    (commonLayout)/         # Public pages & chat widget (home, book, pricing, auth pages…)
      book/                 # Booking page + slot picker
      booking/success       # Post-payment success page
      booking/cancelled     # Post-payment cancellation page
      login/ register/      # Trader authentication
    (dashboardLayout)/      # Protected trader area
      dashboard/            # Overview / schedule
      dashboard/work-area   # Zone + availability setup
      dashboard/stripe      # Stripe Connect onboarding
      dashboard/profile     # Profile & working hours
  components/               # Shared UI, chat widget, forms
  services/                 # API client wrappers
  lib/                      # Helpers (auth, formatting)
```

## Key Flows

- **Auth** — JWT token stored in `localStorage` and mirrored to a `token` cookie (7-day expiry). API calls send `Authorization: Bearer <token>`; `useAxiosSecure` redirects to `/login` on 401/403.
- **Route protection** — `src/proxy.ts` (Next 16 middleware) guards every `/dashboard/*` route using the `token` cookie.
- **Chat booking** — the widget drives the server-side conversation state machine (see server README); available-slot chips come from the trader's work-area availability endpoint.
- **Payments** — Stripe Checkout via the server; success/cancelled pages read the checkout result returned by the API.

## Deployment (Vercel)

1. Push the repo to GitHub and import it in **Vercel**.
2. Add the environment variable:

   ```env
   NEXT_PUBLIC_API_URL=https://tradeslot-server.onrender.com/api/v1
   ```

3. Deploy. `vercel.json` is already configured for the framework.

> **Note:** `.env.production` is committed for Render-hosted API parity, but Vercel dashboard env vars take precedence for its build.

## Repository Notes

- `@/*` imports alias to `src/*`.
- Built with Next.js 16 + React 19; when unsure about a Next.js API, consult the docs shipped in `node_modules/next/dist/docs/`.
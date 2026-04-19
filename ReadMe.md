# BiteBlitz

BiteBlitz is a full-stack food ordering platform with:

- `frontend/`: customer-facing app
- `admin/`: dashboard for managing food items and orders
- `backend/`: REST API with authentication, cart, orders, uploads, and Stripe integration

Live links:

- Customer app: https://biteblitz-six.vercel.app/
- Admin app: https://biteblitzadmin.vercel.app/

![BiteBlitz Home](screenshots/frontend_home.png)

## Tech Stack

- Frontend/Admin: React + Vite + React Router + Axios + React Toastify
- Backend: Node.js + Express + Mongoose + JWT + Multer + Stripe
- Database: MongoDB
- Deployment: Vercel

## Key Features

- User signup/login with JWT auth
- Food listing with cart management
- Checkout flow with Stripe payment verification
- Order history for users
- Admin authentication and dashboard
- Admin food management (add/list/remove)
- Admin order management (list/update status)

## Project Structure

```text
BiteBlitz-main/
|- frontend/   # customer UI
|- admin/      # admin dashboard
|- backend/    # API server
`- screenshots/
```

## Local Setup

1. Clone and enter the project:

```sh
git clone https://github.com/tanisshqbhardwwaj/BiteBlitz.git
cd BiteBlitz-main
```

2. Install dependencies for all apps:

```sh
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

3. Create `backend/.env`:

```dotenv
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
```

4. Create env files for frontend/admin (optional but recommended):

- `frontend/.env`

```dotenv
VITE_API_URL=http://localhost:8000
```

- `admin/.env`

```dotenv
VITE_API_URL=http://localhost:8000
```

5. Start all services in separate terminals:

```sh
# backend (runs on 8000 by default)
cd backend
npm run server
```

```sh
# frontend (Vite default: 5173)
cd frontend
npm run dev
```

```sh
# admin (Vite default: 5174 when 5173 is occupied)
cd admin
npm run dev
```

## Scripts

- `backend`: `npm run server`
- `frontend`: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`, `npm run typecheck`
- `admin`: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`

## API Overview

Base URL (local): `http://localhost:8000`

- User
   - `POST /api/user/register`
   - `POST /api/user/login`
- Cart
   - `POST /api/cart/add`
   - `POST /api/cart/remove`
   - `POST /api/cart/get`
- Food
   - `POST /api/food/add`
   - `GET /api/food/list`
   - `POST /api/food/remove`
- Orders
   - `POST /api/order/place`
   - `POST /api/order/verify`
   - `POST /api/order/userorders`
   - `GET /api/order/list`
   - `POST /api/order/status`

Health check:

- `GET /api/health`

## Screenshots

![Admin Login](screenshots/admin_login.png)
![Admin Dashboard](screenshots/admin_dashboard.png)
![Admin Add Item](screenshots/add_item_drag_drop.png)

## Developer

[Tanishq Bhardwaj](https://github.com/Tanisshqbhardwwaj)

## Contributing

Contributions are welcome. Open an issue or submit a pull request with clear details.

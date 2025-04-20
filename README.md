# Car Shop 🚗

A modern web application for car shopping, browsing, and purchasing with a user-friendly interface and secure authentication.

## Live Link

https://car-shop-five-henna.vercel.app/

## Features

- **User Authentication** - Secure login and registration with JWT
- **Product Browsing** - Search, filter, and view car listings
- **Shopping Cart** - Add cars to cart and proceed to checkout
- **User Dashboard** - View order history and manage profile
- **Admin Dashboard** - Manage products, users, and orders
- **Responsive Design** - Works on all devices and screen sizes

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: TailwindCSS
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **API Requests**: Axios, React Query
- **UI Components**: Radix UI, Framer Motion
- **Payment Integration**: Stripe

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/Tasfiq-asif/car-shop.git
cd car-shop
```

2. Install dependencies

```bash
npm install
# or
yarn
```

3. Set up environment variables
   Create a `.env.local` file in the root directory with necessary environment variables.

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser to see the application.

## Project Structure

- `/src/components`: Reusable UI components
- `/src/pages`: Application pages
- `/src/layouts`: Layout components
- `/src/redux`: Redux store and slices
- `/src/hooks`: Custom React hooks
- `/src/lib`: Utility functions
- `/src/routes`: Route definitions
- `/src/types`: TypeScript type definitions
- `/src/assets`: Static assets

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## License

MIT

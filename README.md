# 💰 Expense Tracker (Full-Stack)

A minimal full-stack Expense Tracker built with React (frontend) and
Node.js + Express + MongoDB (backend).

This application allows users to create, filter, sort, and review
personal expenses in a reliable way, designed to handle real-world
conditions such as retries, slow networks, and page refreshes.

------------------------------------------------------------------------

## 🚀 Features

### Backend

-   Create new expense (POST /expenses)
-   Retrieve expense list (GET /expenses)
-   Filter by category
-   Sort by newest date
-   Idempotent POST requests (safe against duplicate submissions)
-   Money stored safely as integer (paise)
-   Consistent API response format: { "success": true/false, "data":
    ..., "message": "..." }

### Frontend

-   Tab-based dashboard UI
-   Add Expense form
-   View Expenses table
-   Filter by category
-   Sort by newest
-   Auto-calculated total (visible expenses only)
-   Toast notifications (success & error)
-   Loading and error states
-   Prevents double submissions

------------------------------------------------------------------------

## 🏗 Project Structure

expense-tracker/ ├── backend/ │ ├── src/ │ │ ├── config/ │ │ ├──
controllers/ │ │ ├── models/ │ │ ├── routes/ │ │ ├── app.js │ │ └──
server.js │ └── .env │ ├── frontend/ │ ├── src/ │ │ ├── components/ │ │
├── services/ │ │ ├── App.jsx │ │ └── main.jsx │ └── README.md

------------------------------------------------------------------------

## 🗄 Data Model

Each expense contains: - id - amount (stored as integer in paise) -
category - description - date - created_at - idempotencyKey

Money is stored as integer to avoid floating-point precision errors.

------------------------------------------------------------------------

## 🔁 Idempotent Request Handling

The backend requires an `Idempotency-Key` header for POST requests.

If the same request is retried: - The backend returns the existing
record. - Duplicate expenses are not created.

------------------------------------------------------------------------

## 🧰 Tech Stack

Frontend: - React - Axios - Tailwind CSS

Backend: - Node.js - Express - MongoDB - Mongoose

------------------------------------------------------------------------

## ⚙️ Local Setup

### Backend

cd backend npm install npm run dev

Create a `.env` file: PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/expense-tracker

### Frontend

cd frontend npm install npm run dev

Frontend runs on http://localhost:5173\
Backend runs on http://localhost:5000

------------------------------------------------------------------------

## 🌍 Deployment (Recommended)

Deploy separately: - Backend → Render Web Service - Frontend → Render
Static Site - Database → MongoDB Atlas

------------------------------------------------------------------------

## 🧠 Design Decisions

-   Used MongoDB for flexible schema.
-   Stored money as integer to avoid precision issues.
-   Implemented idempotency for production-like safety.
-   Separated backend layers (routes, controllers, models).
-   Used centralized API service in frontend.
-   Used toast notifications for UX clarity.

------------------------------------------------------------------------

## ⚠ Trade-offs

-   No authentication layer (single-user assumption).
-   No pagination (small dataset focus).
-   Minimal styling to prioritize correctness.

------------------------------------------------------------------------

## 🔮 Future Improvements

-   Category summary view
-   Pagination
-   Edit & delete functionality
-   Authentication
-   Automated tests
-   Dockerization

------------------------------------------------------------------------

Built as a minimal but production-conscious full-stack implementation.


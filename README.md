# My PWA App

A Progressive Web Application (PWA) built with the MERN stack (MongoDB, Express, React, Node.js).

## Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **PWA Support**: vite-plugin-pwa

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT & Bcrypt
- **Validation**: Validator
- **Environment**: Dotenv

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed or a MongoDB Atlas connection string

### Installation

1. **Clone the repository**

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file in the `Backend` directory with your configuration (PORT, MONGODB_URI, JWT_SECRET, etc.).
   
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

## Features
- Full PWA support (Installable, Offline capabilities)
- Secure User Authentication (Login/Signup)
- Responsive UI with Tailwind CSS
- RESTful API Backend

# My To Do  App

A full-stack Progressive Web Application (PWA) built using the MERN stack (MongoDB, Express.js, React, Node.js) that enables secure task management with authentication, real-time CRUD operations, and offline support for an enhanced user experience.

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
   node src/index.js
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
4. **env**
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## Features
- Full PWA support (Installable, Offline capabilities)
- Secure User Authentication (Login/Signup)
- Responsive UI with Tailwind CSS
- RESTful API Backend

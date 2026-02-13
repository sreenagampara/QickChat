# QuickChat

A real-time messaging application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io.

## Refactored Structure

The codebase is separated into two distinct applications:

- **`client/`**: The Frontend application (Vite + React).
- **`server/`**: The Backend API and Socket server (Node.js + Express).

## Folder Structure

```
/
├── client/          # Frontend Application
│   ├── src/
│   ├── public/
│   └── package.json
├── server/          # Backend Application
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── sockets/
│   └── package.json
└── README.md        # This file
```

## Installation

You must install dependencies for **both** the client and server separately.

### 1. Client Setup
```bash
cd client
npm install
```

### 2. Server Setup
```bash
cd server
npm install
```

## Development

Run the client and server in **separate terminals**.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```
*Server runs on http://localhost:5000*

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```
*Client runs on http://localhost:3000*

## Production Build & Deployment

### Client
Build the frontend for production:
```bash
cd client
npm run build
```
This generates a `dist` folder that can be served statically (e.g., via Vercel, Netlify, or Nginx).

### Server
Start the server in production mode:
```bash
cd server
npm start
```

### Environment Variables (.env)

**Client (`client/.env`):**
```ini
VITE_BACKEND_URL=http://localhost:5000  # Or production URL (empty if same-origin proxy)
```

**Server (`server/.env`):**
```ini
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
FRONTEND_URL=http://localhost:3000
```

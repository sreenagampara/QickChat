import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import connectDB from './config/db.js';
import { app, server } from './sockets/socket.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

import morgan from 'morgan';
import helmet from 'helmet';

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('common'));
}
app.use(helmet());

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Error Handler
import { errorHandler } from './middleware/error.middleware.js';
app.use(errorHandler);

server.listen(PORT, () => {
    connectDB();
    console.log(`Server Running on port ${PORT}`);
});

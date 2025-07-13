import express from "express";
import authRouter from './routes/auth.js';
import cors from 'cors';
import connectDB from './db/db.js';
import dotenv from 'dotenv';
import noteRouter from './routes/note.js';
dotenv.config();    

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173', // for local frontend (Vite)
    'https://notes-app-shruti-sharmas-projects-09afc016.vercel.app' // for Vercel frontend
  ],
  credentials: true
}));


// server.js
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });
  
app.use('/api/auth', authRouter);
app.use('/api/note', noteRouter);

const startServer = async () => {
  try {
    await connectDB(); // Wait for MongoDB to connect
    app.listen(5000, () => {
      console.log("🚀 Server is running on port 5000");
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1); // Stop the server
  }
};

startServer();
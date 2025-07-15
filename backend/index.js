import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import authRouter from './routes/auth.js';
import noteRouter from './routes/note.js';

import path from 'path';
import { fileURLToPath } from 'url';










dotenv.config();
const app = express();

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://notes-app.vercel.app',
  'https://notes-app-kappa-umber.vercel.app',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('❌ Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.options('*', cors(corsOptions)); // Preflight support


app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use('/api/auth', authRouter);
app.use('/api/note', noteRouter);



// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from Vite build (e.g., dist/)
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to handle React Router in Vite
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});




const startServer = async () => {
  try {
    await connectDB();
    app.listen(5000, () => {
      console.log("🚀 Server is running on port 5000");
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
};

startServer();

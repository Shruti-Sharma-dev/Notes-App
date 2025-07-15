import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './db/db.js';
import authRouter from './routes/auth.js';
import noteRouter from './routes/note.js';

// Load env variables
dotenv.config();

const app = express();

// Allow these domains to make requests to the backend
const allowedOrigins = [
  'http://localhost:5173',
  'https://notes-app.vercel.app',
  'https://notes-app-kappa-umber.vercel.app',
];

// CORS configuration
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

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.options('*', cors(corsOptions));

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// --- API ROUTES ---
app.use('/api/auth', authRouter);
app.use('/api/note', noteRouter);

// --- STATIC FRONTEND (from Vite build) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from dist/
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all to serve React routes (support refresh)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// --- CONNECT DATABASE AND START SERVER ---
const startServer = async () => {
  try {
    await connectDB();
    app.listen(5000, () => {
      console.log('🚀 Server is running on http://localhost:5000');
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
};

startServer();

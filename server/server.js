import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { clerkWebhookSecret } from './controllers/clerkWebhooks.js';

connectDB(); // Connect to MongoDB

const app = express();
app.use(cors()); // Enable CORS for all routes

app.post("/api/clerk", express.raw({ type: 'application/json' }), clerkWebhookSecret);

// Middleware
app.use(express.json()); // Parse JSON bodies cho các API khác
app.use(clerkMiddleware()); // Clerk authentication middleware

app.get('/', (req, res) => {
    res.send('API is running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
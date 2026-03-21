import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import { clerkWebhookSecret } from './controllers/clerkWebhooks.js';

connectDB(); // Connect to MongoDB

const app = express();
app.use(cors()); // Enable CORS for all routes

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(clerkMiddleware()); // Clerk authentication middleware

// API to listen to Clerk webhooks
app.post('/api/clerk', clerkWebhookSecret);

app.get('/', (req, res) => {
    res.send('API is running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
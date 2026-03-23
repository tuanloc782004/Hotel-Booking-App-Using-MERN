import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { clerkWebhookSecret } from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

connectDB(); // Connect to MongoDB
connectCloudinary

const app = express();
app.use(cors()); // Enable CORS for all routes

app.post("/api/clerk", express.raw({ type: 'application/json' }), clerkWebhookSecret);

// Middleware
app.use(express.json()); // Parse JSON bodies cho các API khác
app.use(clerkMiddleware()); // Clerk authentication middleware

app.get('/', (req, res) => {
    res.send('API is running');
});
app.use('/api/user', userRouter); // User routes
app.use('/api/hotels', hotelRouter) // Hotel routes
app.use('/api/rooms', roomRouter) // Room routes
app.use('/api/bookings', bookingRouter) // Booking routes 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
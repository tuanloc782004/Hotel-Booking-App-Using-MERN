import User from "../models/User.js";

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
    const { userId } = req.auth; // Get user ID from Clerk authentication

    if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    } else {
        const user = await User.findById(userId);
        req.user = user; // Attach user data to request object
        next();
    }
}
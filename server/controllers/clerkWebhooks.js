import User from "../models/User";
import { Webhook } from "svix";

const clerkWebhookSecret = async () => {
    try {
        // Create a Svix instance with your secret key
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Getting Headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        }

        // Verify Headers
        await whook.verify(JSON.stringify(req.body), headers);

        // Getting Data form Request Body
        const { data, type } = req.body;

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            name: data.first_name + " " + data.last_name,
            image: data.image_url,
        }

        // Switch case for different types of events
        switch (type) {
            case "user.created":
                await User.create(userData);
                break;
            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData);
                break;
            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                break;
            default:
                break;
        }
        res.json({ success: true, message: "Webhook received successfully" });

    } catch (error) {
        console.error("Error processing webhook:", error.message);
        res.json({ success: false, message: error.message });
    }
};

export { clerkWebhookSecret };
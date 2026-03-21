import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhookSecret = async (req, res) => {
    try {
        // Create a Svix instance with your secret key
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Getting Headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        }

        const payload = req.body.toString();

        whook.verify(payload, headers);

        // Chuyển đổi chuỗi thành Object để trích xuất dữ liệu
        const { data, type } = JSON.parse(payload);

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url,
            recentSearchedCities: []
        }

        // Switch case for different types of events
        switch (type) {
            case "user.created":
                await User.create(userData);
                console.log("✅ Lưu User mới thành công!");
                break;
            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData);
                console.log("✅ Cập nhật User thành công!");
                break;
            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                console.log("🗑️ Đã xóa User!");
                break;
            default:
                break;
        }
        res.status(200).json({ success: true, message: "Webhook received successfully" });

    } catch (error) {
        console.error("❌ Lỗi xử lý webhook:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

export { clerkWebhookSecret };
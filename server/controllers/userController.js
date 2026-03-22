
// GET /api//user
export const getUserData = async (req, res) => {
    try {
        const role = req.query.role; // Lấy role từ query parameter
        const recentSearchedCities = req.query.recentSearchedCities; // Lấy recentSearchedCities từ query parameter
        res.json({ success: true, role, recentSearchedCities });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Store User Recently Searched Cities
export const storeRecentSearchedCities = async (req, res) => {
    try {
        const { recentSearchedCity } = req.body; // Lấy recentSearchedCity từ body
        const user = await req.user; // Lấy user từ middleware bảo vệ

        if (user.recentSearchedCities.length < 3) {
            user.recentSearchedCities.push(recentSearchedCity)
        } else {
            user.recentSearchedCities.shift()
            user.recentSearchedCities.push(recentSearchedCity)
        }
        await user.save()
        res.json({ success: true, message: "City added" })

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

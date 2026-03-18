import express from 'express';
import "dotenv/config";
import cors from 'cors';

const app = express();
app.use(cors()); // Enable CORS for all routes

app.get('/', (req, res) => {
    res.send('API is running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
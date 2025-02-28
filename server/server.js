const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');
const userRouter = require('./routes/userRoute');
const productRouter = require("./routes/productRoute");
const userCart = require("./routes/cart");
const profileRoutes = require("./routes/profileRoutes");

const app = express();
dotenv.config();
app.use(express.json());

app.use(
    cors({
      origin: process.env.CORS_ORIGIN, 
      credentials: true, 
    })
);


app.use("/saved", userCart);
app.use("/profile", profileRoutes);
app.use("/api", productRouter);
app.use("/api/users", userRouter);


app.get("/", (req, res) => {
    try {
        return res.status(200).json({message: "Backend is running..."});
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server is listening on http://localhost:${PORT}`);
    } catch (err) {
        console.error(err.message);
    }
});
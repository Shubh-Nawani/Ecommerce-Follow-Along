const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoute');
const router = require("./routes/productRoute");
const userCart = require("./routes/cart")
const profileRoutes = require("./routes/profileRoutes");
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:5173", // Allow requests from frontend
      credentials: true, // Allow credentials (cookies, sessions, etc.)
    })
  );
dotenv.config();

app.use("/saved", userCart)
app.use("/profile", profileRoutes);

app.use("/api", router);


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
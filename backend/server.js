const express = require("express")
const app = express()
const userRoute = require("./routes/userRoute.js")
const productRoute = require("./routes/productRoute.js")
const connectDB = require('./config/db.js')
require("dotenv").config();
app.use(express.json())

app.use('/api/user', userRoute)
app.use('/api/products', productRoute)

app.get("/", (req, res) => { 

    res.send("STATUS CODE: 200")
    console.log("Backend is running")
})

app.post("/", (req, res) => {
    try {
        res.send("Successfull")
    } catch (error) {
        res.status(500).send("Server Error")
    }
})

const PORT = process.env.PORT

app.listen(PORT, async() => {
    try {
        await connectDB();
        console.log(`Listening on port http://localhost:${PORT}`)
    } catch (error) {
        console.error("Server failed to start");
    }
})


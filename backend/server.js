const express = require("express")
const app = express()
const userRoute = require("./routes/userRoute.js")
const connectDB = require('./config/db.js')
require("dotenv").config();
app.use(express.json())

app.use('/api/user', userRoute)


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

app.listen(8000, async() => {
    try {
        await connectDB();
        console.log("Listening on port http://localhost:8000/")
    } catch (error) {
        console.error("Server failed to start");
    }
})

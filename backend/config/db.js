const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})
        console.log("MongoDB is connected!")
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = connectDB

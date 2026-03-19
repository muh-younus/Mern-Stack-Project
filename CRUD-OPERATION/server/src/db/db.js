const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("MongoDB connection failed:", err);
        process.exit(1); // exit process if DB fails to connect
    }
}

module.exports = connectDB
// 1️⃣ Import mongoose
const mongoose = require("mongoose");

// 2️⃣ Connect to MongoDB Atlas
const uri = "mongodb+srv://student:student@student.lipnsrt.mongodb.net/myDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, {

})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.log("❌ Connection error:", err));

// 3️⃣ Create a Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String
});

// 4️⃣ Create a Model
const User = mongoose.model("User", userSchema);

// 5️⃣ Insert Data
const user1 = new User({
  name: "Sajid",
  age: 22,
  city: "Rawalpindi"
});

// 6️⃣ Save to database
user1.save()
  .then(() => {
    console.log("✅ Data inserted successfully");
    mongoose.connection.close(); // close connection
  })
  .catch((err) => console.log("❌ Insert error:", err));
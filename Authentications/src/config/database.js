import mongoose from "mongoose";
import url from "./config.js";


async function connectDatabase() {
  try {
    await mongoose.connect(url.MONGO_URI);
    console.log("Connected to Mongodb");
  } catch (err) {
    console.log("Error connecting to Mongodb", err);
  }
}

export default connectDatabase;



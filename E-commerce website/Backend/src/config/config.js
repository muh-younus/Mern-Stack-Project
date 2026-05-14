import dotenv from "dotenv"
dotenv.config();

if(!process.env.PORT){
    throw new Error("The server Port is not set in env")
}
if(!process.env.MONGO_URL){
    throw new Error("The Mongodb url is not working")
}
if(!process.env.JWT_SECRET){
    throw new Error("The jwt secret is invalid")
}

const config = {
    SERVER_PORT:process.env.PORT,
    MONGODB_URL:process.env.MONGO_URL,
    JWT_SECRET:process.env.JWT_SECRET
}

export default config;
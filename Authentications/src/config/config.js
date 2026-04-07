import dotenv from 'dotenv';
dotenv.config();


if(!process.env.MONGO_URI){
    throw new Error("Mongo-uri is not defined inn environment variable")

}
if(!process.env.JWT_SECRET){
    throw new Error("jwt secret is not defined in the .env variable")
}

const url = {

    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
}

export default url;
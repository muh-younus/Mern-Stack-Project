import dotenv from 'dotenv';
dotenv.config();




if(!process.env.MONGO_URI){
    throw new Error("Mongo-uri is not defined inn environment variable")

}
if(!process.env.JWT_SECRET){
    throw new Error("jwt secret is not defined in the .env variable")
}
if(!process.env.CLIENT_ID){
    throw new Error("Client secret is not defined in the .env variable")
}
if(!process.env.CLIENT_SECRET){
    throw new Error("Client secret is not defined in .env variable")
}
if(!process.env.GOOGLE_REFRESH_TOKEN){
    throw new Error("Google refresh token is not defined")
}
if(!process.env.GOOGLE_USER){
    throw new Error("Google user is not defined in .env variable")
}

const config = {

    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER:process.env.GOOGLE_USER
   

}

export default config;
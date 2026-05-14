import express from "express"
import cors from "cors"
import config from "./src/config/config.js"
import database from "./src/config/database.js"
import authRoutes from "./src/routes/authRoutes.js"
import productRoutes from "./src/routes/productRoutes.js"
import cartRoutes from "./src/routes/cart.js"
import addressRoutes from "./src/routes/address.js"


const app = express()
//to communicate from external sources
app.use(cors())
//to parse incoming data
app.use(express.json())

/* User Routes */
app.use('/api/auth',authRoutes)

/* Product routes */
app.use('/api/products',productRoutes)

// Cart routes
app.use('/api/cart',cartRoutes)

//address routes
app.use('/api/address',addressRoutes)

/* Database Connection */
database()

app.listen(config.SERVER_PORT,()=>{
    console.log(`Your server is running on ${config.SERVER_PORT}`)
})
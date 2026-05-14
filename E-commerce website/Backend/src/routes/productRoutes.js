import express from 'express'
import {
     createProduct,
     gettAllProduct,
     updatedProduct,
     deleteProduct } from '../controller/productController.js'


const router = express.Router()

/* Route to create a new product */
router.post("/add",createProduct);

/* Get all product */
router.get("/",gettAllProduct)

/* Route to update a product by ID */
router.put('/update/:id',updatedProduct)

/* Route to update a delete by ID */
router.delete('/delete/:id',deleteProduct)

export default router


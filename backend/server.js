import {connectDB} from './config/db.js';
import express from 'express';
import Product from './models/product.js'
import dotenv from  'dotenv';

dotenv.config();

const app = express();

app.use(express.json()) //alows to accept JSON data


//post method
app.post('/api/products', async (req, res) => {
    const product = req.body; // user data
    
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success : false, message: "Please provide all fields"})
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save()
        return res.status(201).json({success : true, data: newProduct})
    } catch(error) {
        console.error("Error in create product: ", error.message)
        res.status(500).json({success: false, message:"Server Error"})
    }
})

app.delete('/api/products/:id', async(req, res) => {
    const {id} = req.params

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success : true, message: "Product deleted"})
    } catch (error) {
        res.status(404).json({sucess: false, message: "Product not found"})
    }
})

app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000');
})

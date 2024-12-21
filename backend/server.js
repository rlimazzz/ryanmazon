import {connectDB} from './config/db.js';
import express from 'express';
import dotenv from  'dotenv';

dotenv.config();

const app = express();


app.get('/products', async (req, res) => {
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

app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000');
})

// const express = require("express"); // Old Common JS
import express from 'express'; // New Module ES-6 Syntax
import dotenv from 'dotenv';
import { connectDB  } from './config/db.js';

dotenv.config();

const app = express();


//API to Add Product
app.post("/products", async (req, res) => {

    const product = req.body; //User will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false , message: "Please provide all required fields"})
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success : true, data: newProduct})
    } catch (error) {
        console.log("Error in Create Product: ", error.message);
        res.status(500).json({success: false , message: "Server Error"})
    }
})


//Hume nahi pata na, server shuru karne ko kitna time lag jayega, i.e. listen() method ko, therefore we say ki karta reh, in formal words, I can say that let it happen asynchronously, but as soon as it happens, call the inside function, i.e. Callback Function,   i.e. function to call the console.log statement

app.listen(5000, () => {
    connectDB();
    console.log('Server started on http://localhost:5000');
})



// console.log(process.env.MONGO_URI);
// const express = require("express"); // Old Common JS
import express from 'express'; // New Module ES-6 Syntax
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import productRoutes from "./routes/product.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // This is a middleware, that allows us to accept JSON Data in the request body req.body, a function that runs in order to send the response back to the client

app.use("/api/products", productRoutes);



app.listen(PORT, () => {
    connectDB();
    console.log('Server started on http://localhost:' + PORT);
})

//The above, Hume nahi pata na, server shuru karne ko kitna time lag jayega, i.e. listen() method ko, therefore we say ki karta reh, in formal words, I can say that let it happen asynchronously, but as soon as it happens, call the inside function, i.e. Callback Function,   i.e. function to call the console.log statement


// console.log(process.env.MONGO_URI);
import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async(req, res) => {

    try {
        const products = await Product.find({}); // if we pass an empty object, that means fetch all products
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log("Error in Fetching Products: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }

}

export const addProduct = async (req, res) => {

    const product = req.body; //User will send this data

    if(!product.name || !product.price || !product.image || !product.description){
        return res.status(400).json({success: false , message: "Please provide all required fields"})
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success : true, data: newProduct})
    } catch (error) {
        console.log("Error in Creating Product: ", error.message);
        res.status(500).json({success: false , message: "Server Error"})
    }
}

export const updateProduct =  async (req, res) => {
    const {id} = req.params;

    //Handling the Product Not Found, in case of update here and the 500 Server Error in the trycatch
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success: false , message: "Invalid Product Id"})
    }

    const product = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        console.log("Error in Upating   Product: ", error.message);
        res.status(500).json({success: false , message: "Server Error"})
    }
}

export const deleteProduct =  async (req, res) => {
    const {id} = req.params;
    console.log("ID:" + id);

    //Handling the Product Not Found, in case of update here and the 500 Server Error in the trycatch
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success: false , message: "Invalid Product Id"})
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted"});
    } catch (error) {
        console.log("Error in Deleting Product: ", error.message);
        res.status(500).json({success: false , message: "Server Error"})
    }
}
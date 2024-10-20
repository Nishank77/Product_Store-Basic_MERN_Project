import mongoose from "mongoose";


//SCHEMA : Basically Table ka Structure dene jaisa, ya POJO/Entity banane jaise
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        default: ""
    }

},{
    timestamps: true //Give the createdAt, updatedAt automatically
});



const Product = mongoose.model('Product', productSchema); // Moongoose automatically converts the 'Product' -> products

export default Product;



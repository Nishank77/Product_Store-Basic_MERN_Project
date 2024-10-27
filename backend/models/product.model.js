import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence"; // imported mongoose-sequence
import dotenv from "dotenv"

dotenv.config();

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.error("MongoDB connection error:", err));

mongoose.createConnection(process.env.MONGO_URI);


// Initialize the auto-increment plugin
const AutoIncrementPlugin = AutoIncrement(mongoose);

// Define the schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Apply the auto-increment plugin to the `id` field
productSchema.plugin(AutoIncrementPlugin, { inc_field: "id" });

// Create the model
const Product = mongoose.model("Product", productSchema);

export default Product;

const mongoose = require('mongoose');

//defines what we are saving to the database
const ProductSchema = new mongoose.Schema({
    price: "String",
    title: "String",
    description: "String"
}, {timestamps: true})

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
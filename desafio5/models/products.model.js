const mongoose = require('mongoose');

const productCollection = "products";

const productSchema = new mongoose.Schema ({
    titulo: String, 
    descripcion: String, 
    precio: Number, 
    imagen: String, 
    codigo: Number, 
    stock: Number,
    id: Number,
})

const productModel = mongoose.model(productCollection, productSchema);

module.exports = {
    productModel
}
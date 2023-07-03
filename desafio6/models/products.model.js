const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const productCollection = "products";

const productSchema = new mongoose.Schema ({
    titulo: String, 
    descripcion: String, 
    precio: Number, 
    imagen: String, 
    codigo: {
        type: Number,
        index: true,
    },
    stock: {
        type: Number,
        default: 1
    },
});
productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productCollection, productSchema);

module.exports = {
    productModel
}
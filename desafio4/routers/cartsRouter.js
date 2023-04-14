//EXPRESS
const express = require('express');
const cartsRouter = express.Router();

//VARIABLES
let countId = 0
let countCantidad = 0
let carts = []

//FUNCIONES
cartsRouter.post('/', (req, res) => {
    const cart = req.body;
    const carrito = req.body.carrito;
    if (carrito.length === 0) {
        res.send("El carrito se encuentra vacío")
    } else {
        countId++;
        cart.idCart = countId
        carts.push(cart)
        res.send("Carrito agregado");
    }
})
cartsRouter.get('/:idCarts', (req, res) => {
    const idCarts = req.params.idCarts;
    const cart = carts.find((e) => e.idCart === +idCarts);
    if (cart) {
        res.send(cart)
    } if (!cart) {
        res.send("Cart no encontrada")
    }
})
cartsRouter.post('/:idCarts/products/:idProducto', (req, res) => {
    const producto = req.body;
    const idCarts = req.params.idCarts;
    const idProducto = req.params.idProducto;
    const obtenerCart = carts.find((e) => e.idCart === +idCarts);
    if (obtenerCart) {
        const obtenerIndex = carts.indexOf(obtenerCart)
        const obtenerCarrito = carts[obtenerIndex]["carrito"];
        const obtenerProducto = obtenerCarrito.find(e => e.codigo === +idProducto)
        if (obtenerProducto) {
            obtenerProducto.cantidad++;
            res.send("Cantidad del producto aumentada")
        } else {
            obtenerCarrito.push(producto);
            res.send("Producto agregado al carrito")
        }
    } else {
        res.send("Cart no encontrada");
    }
})
module.exports = {
    cartsRouter,
}
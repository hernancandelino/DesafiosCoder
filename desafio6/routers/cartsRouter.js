//EXPRESS
const express = require('express');
const cartsRouter = express.Router();
const {cartModel} = require('../models/carts.model.js');
const {productModel} = require('../models/products.model.js');
const { isObjectIdOrHexString } = require('mongoose');
const { ObjectId } = require('mongodb');

//FUNCIONES
cartsRouter.post('/', async (req, res) => {
    const {_id} = req.body;
    if (_id.length === 0) {
        res.status(500).json("Carrito vacío");
    } else {
        try {
            let carritoNuevo = await cartModel.create({"carrito" : {product: _id}})
            res.status(200).json({
              result: "success",
              payload: carritoNuevo,
            });
        } catch (err) {
            res.status(500).json({ error: err }); 
        }
    }
})
cartsRouter.get('/:idCart', async (req, res) => {
    const idCart = req.params.idCart;
    try {
        let carrito = await cartModel.find({_id: idCart}).populate('carrito.product')
        if (carrito.length === 0) {
            res.status(500).json("Carrito no encontrado");
        } else {
            res.status(200).json({
              result: "success",
              payload: carrito,
            });
        }
    } catch (err) {
        res.status(500).json({ error: err }); 
    }})
cartsRouter.post('/:idCarts/products/:idProducto', async (req, res) => {
    const idCarts = req.params.idCarts;
    const idProducto = req.params.idProducto;
    try {
        let carrito = await cartModel.findOne({_id: idCarts, 'carrito.product': idProducto});
        if (carrito === null) {
            try {
                let carritoAgregar = await cartModel.updateOne({_id: idCarts}, {$push: {"carrito": {product: idProducto}}})
                res.status(200).json({
                    result: "success",
                    payload: carritoAgregar,
                });
            } catch (err) {
                res.status(200).json({error: "Carrito no encontrado"})
            }
        } else {
            try {
                let modificarProducto = await cartModel.updateOne(
                    { _id: idCarts },
                    { $inc: { "carrito.$[element].cantidad": 1 } },
                    { arrayFilters: [{ "element.product": idProducto }] }
                    );
                res.status(200).json({
                    result: "success",
                    payload: modificarProducto,
                });
            } catch (err) {
                res.status(200).json({error: "Carrito no encontrado"})
            }
        }
    } catch (err) {
        res.status(200).json({error: "Carrito no encontrado"})
    }
})
cartsRouter.delete('/:idCarts/products/:idProducto', async (req, res) => {
    const idCarts = req.params.idCarts;
    const idProducto = req.params.idProducto;
    try {
        let carrito = await cartModel.findOne({ _id: idCarts, 'carrito.product': idProducto });
            if (carrito == null) {
                res.status(500).json("Producto no encontrado en el carrito");
            } else {
                try {
                    let eliminarProducto = await cartModel.updateOne({_id: idCarts}, {$pull: {carrito: {"product": idProducto}}})
                    res.status(200).json({
                        result: "success",
                        payload: eliminarProducto,
                    });
                } catch (err) {
                    res.status(500).json({ error: err });
                } 
            }
    } catch (err) {
        res.status(500).json({ error: err }); 
    }
})
cartsRouter.delete('/:idCarts', async (req, res) => {
    const idCarts = req.params.idCarts;
    try {
        let carritoCambiar = await cartModel.find( {_id: idCarts})
        try {
            let eliminarProducto = await cartModel.updateOne({_id: idCarts}, {$set: {carrito: []}})
            res.status(200).json({
                result: "success",
                payload: eliminarProducto,
            });
        } catch (err) {
            res.status(500).json({ error: err });
        } 
    } catch (err) {
        res.status(500).json({ error: "Carrito no encontrado"}); 
    }
})
module.exports = {
    cartsRouter,
}
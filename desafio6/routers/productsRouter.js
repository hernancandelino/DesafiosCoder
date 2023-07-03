//EXPRESS
const express = require('express')
const routerCompras = express.Router();
const {productModel} = require('../models/products.model.js');


routerCompras.use(express.json())
routerCompras.use(express.urlencoded({ extended: true }))

//FUNCIONES
routerCompras.get('/', async (req, res) => {
    let limit = req.query.limit
    if (limit == "" || limit == null || limit == NaN || limit == undefined) {
        limit = 10
    }
    let page = req.query.page
    if (page == "" || page == null || page == NaN || page == undefined) {
        page = 1
    };
    const propiedad = req.query.propiedad
    const valor = req.query.valor
    const sort = req.query.sort
    try {
        if (propiedad == "" || propiedad == null || propiedad == NaN || propiedad == undefined || valor == "" || valor == null || valor == NaN || valor == undefined) {
            try {
                if (sort == "" || sort == null || sort == NaN || sort == undefined) {
                    let products = await productModel.paginate({}, { page: +page, limit: +limit});
                    res.status(200).json({
                        result: "success",
                        payload: products,
                    });
                } else {
                    let products = await productModel.paginate({}, { page: +page, limit: +limit, sort: {precio: sort}});
                    res.status(200).json({
                        result: "success",
                        payload: products,
                    });
                }
            } catch (err) {
                res.status(500).json({ error: err });
            }} else {
                try {
                    if (sort == "" || sort == null || sort == NaN || sort == undefined) {
                        let products = await productModel.paginate({[`${propiedad}`]: valor}, { page: +page, limit: +limit});
                        res.status(200).json({
                            result: "success",
                            payload: products,
                        });
                    } else {
                        let products = await productModel.paginate({[`${propiedad}`]: valor}, { page: +page, limit: +limit, sort: {precio: sort}});
                        res.status(200).json({
                            result: "success",
                            payload: products,
                        });
                    }
                } catch (err) {
                    res.status(500).json({ error: err });
                }
            }
        } catch (err) {
            res.status(500).json({ error: err }); 
        }
    }
);
routerCompras.get('/:idProducto', async (req, res) => {
    const idProducto = req.params.idProducto;
    try {
        const producto = await productModel.find({codigo: +idProducto});
        if (producto.length === 0) {
            res.status(500).json("Codigo no encontrado");
        } else {
            res.status(200).json({
                result: "success",
                payload: producto,
            });
        }
    } catch (err) {
        res.status(500).json({ error: err }); 
    }
})
routerCompras.post('/', async (req, res) => {
    const { titulo, descripcion, precio, imagen, codigo, stock } = req.body;
    try {
        let productoNuevo = await productModel.find({codigo: +codigo})
        if (productoNuevo.length === 0) {
            let result = await productModel.create({ titulo, descripcion, precio, imagen, codigo, stock });
            res.status(200).json({
                result: "success",
                payload: result,
            });
        } else {
            res.status(500).json("Codigo ya utilizado");
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
})
routerCompras.put('/:idProducto', async (req, res) => {
    const idProducto = req.params.idProducto
    const { titulo, descripcion, precio, imagen, codigo, stock } = req.body;
    try {
        let productoCambiar = await productModel.find({codigo: idProducto})
        if (productoCambiar.length === 0) {
            res.status(500).json("Producto no encontrado");
        } else {
            try {
                const result = await productModel.updateOne({codigo: idProducto}, {$set: { titulo, descripcion, precio, imagen, codigo, stock }});
                res.status(200).json({
                    result: "success",
                    payload: result,
                });
    
            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    } catch (err) {
        res.status(500).json({ error: err }); 
    }
})
routerCompras.delete('/:idProducto', async (req, res) => {
    const idProducto = req.params.idProducto
    try {
        let productoEliminar = await productModel.find({codigo: idProducto})
        if (productoEliminar.length === 0) {
            res.status(500).json("Producto no encontrado");
        } else {
            try {
                const result = await productModel.deleteOne({codigo: idProducto});
                res.status(200).json({
                    result: "success",
                    payload: result,
                });
    
            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    } catch (err) {
        res.status(500).json({ error: err }); 
    }
})

module.exports = {
    routerCompras,
};
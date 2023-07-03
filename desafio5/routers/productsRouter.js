//EXPRESS
const express = require('express')
const productsModel = require('../models/products.model.js')
const routerCompras = express.Router();

routerCompras.use(express.json())
routerCompras.use(express.urlencoded({ extended: true }))

//VARIABLES
let products = [];
let countId = 0

//FUNCIONES
routerCompras.get('/', async (req, res) => {
    let limit = req.query.limit
    let page = req.body.page
    const sort = req.body.sort
    const query = req.body.query
    try {
        let products = await productsModel.find();
        res.status(200).json({
          result: "success",
          payload: products,
        });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    });
    
    

routerCompras.get('/:idProducto', (req, res) => {
    const idProducto = req.params.idProducto;
    const producto = products.find((e) => e.id === +idProducto);
    if (producto) {
        res.send(producto)
    } if (!producto) {
        res.send("Producto no encontrado")
    }
})
routerCompras.post('/', async (req, res) => {
    const { titulo, descripcion, precio, imagen, codigo, stock, id } = req.body;
    console.log( titulo, descripcion, precio, imagen, codigo, stock, id )
    let products = await productsModel.find();
    console.log(products)
    try {
        const productoNuevo = products.find(({codigo}) => codigo === producto.codigo);
        console.log(productoNuevo)
        if (productoNuevo) {
            res.status(500).send("Código ya utilizado")
        } else {
            countId++;
            id = countId;
            let result = await productModel.create( titulo, descripcion, precio, imagen, codigo, stock, id );
            res.status(200).json({ result: "success", payload: result });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
})
routerCompras.put('/:idProducto', (req, res) => {
    const modificacion = req.body;
    const obtenerProducto = products.find((e) => e.id === +req.params.idProducto);
    const obtenerIndex = products.indexOf(obtenerProducto);
    if (obtenerIndex >= 0) {
        products[obtenerIndex][`${modificacion.propiedad}`] === modificacion.value
        res.send("Producto modificado")
    } else {
        res.send("Producto no identificado")
    }
})
routerCompras.delete('/:idProducto', (req, res) => {
    const idProducto = req.params.idProducto;
    const obtenerProducto = products.find((e) => e.id === +idProducto);
    if (obtenerProducto) {
        products.splice(products.indexOf(obtenerProducto),1)
        res.send("Producto eliminado")
    } else {
        res.send("Producto no identificado")
    }
})

module.exports = {
    routerCompras,
};
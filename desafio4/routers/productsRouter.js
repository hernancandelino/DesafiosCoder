//EXPRESS
const express = require('express')
const routerCompras = express.Router();

routerCompras.use(express.json())
routerCompras.use(express.urlencoded({ extended: true }))

//VARIABLES
let products = [];
let countId = 0

//FUNCIONES
routerCompras.get('/', (req, res) => {
    const limite = req.query.limite;
    if (limite && !isNaN(Number(limite))) {
        const respuesta = products.slice(0, limite);
        res.send(respuesta)
    } else if (products.length > 0) {
        res.send(products);
    } else {
        res.send("No hay productos disponibles")
    }
})
routerCompras.get('/:idProducto', (req, res) => {
    const idProducto = req.params.idProducto;
    const producto = products.find((e) => e.id === +idProducto);
    if (producto) {
        res.send(producto)
    } if (!producto) {
        res.send("Producto no encontrado")
    }
})
routerCompras.post('/', (req, res) => {
    const producto = req.body;
    const productoNuevo = products.find(({codigo}) => codigo === producto.codigo)
    if (productoNuevo) {
        res.send("Código ya utilizado")
    } else {
        countId++;
        producto.id = countId;
        products.push(producto);
        res.send("Producto registrado")
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
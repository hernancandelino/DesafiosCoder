//VARIABLES
const productos = []
let countId = 0
const producto1 = {titulo: "banana", descripcion: "null", precio: 100, imagen: "null", codigo: 1, stock: 10, id: countId}
const producto2 = {titulo: "banana", descripcion: "null", precio: 100, imagen: "null", codigo: 2, stock: 10, id: countId}
//FUNCIONES
const aumentarId = () => {
    countId++
}
const obtenerProductos = () => {
    console.log(productos)
}
const agregarProducto = (producto) => {
    const obtenerProducto = productos.find((e) => e.codigo === producto.codigo);
    if (obtenerProducto) {
        console.log("Codigo ya utilizado")
    } else {
        aumentarId();
        producto.id = countId
        productos.push(producto)
    }
}
const obtenerProductoPorId = (productoId) => {
    const obtenerProducto = productos.find((e) => e.codigo === productoId);
    if (obtenerProducto) {
        console.log("Código ya creado")
    } else {
        console.log("Código no utilizado")
    }
}
const eliminarProducto = (producto) => {
    const obtenerProducto = productos.find((e) => e.codigo === producto.id);
    if (obtenerProducto) {
        productos.splice(productos.indexOf(producto),1)
    } else {
        console.log("Producto no identificado")
    }
}
const updateProducto = (producto, campoProducto, nuevoCampo) => {
    const obtenerProducto = productos.find((e) => e.codigo === producto.id);
    if (obtenerProducto) {
        producto[campoProducto] = nuevoCampo;
    } else {
        console.log("Producto no identificado")
    }
}
agregarProducto(producto1);
agregarProducto(producto2);

//EXPRESS
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/productos', (req, res) => {
    const limite = req.query.limite;
    if (limite && !isNaN(Number(limite))) {
        const respuesta = productos.slice(0, limite);
        res.send({respuesta})
    } else {
        res.send({productos})
    }
})

app.get('/productos/:idProducto', (req, res) => {
    const idProducto = req.params.idProducto
    const producto = productos.find((e) => e.id === Number(idProducto))
    if (producto) {
        res.send(producto)
    } if (!producto) {
        res.send("Producto no encontrado")
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
//VARIABLES
const productos = []
let countId = 0
const producto3 = {titulo: "banana", descripcion: "null", precio: 100, imagen: "null", codigo: 1, stock: 10, id: countId}
const producto4 = {titulo: "banana", descripcion: "null", precio: 100, imagen: "null", codigo: 2, stock: 10, id: countId}
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
const express = require('express');
const  mongoose  = require('mongoose')
const {routerCompras} = require('./routers/productsRouter');
const {cartsRouter} = require('./routers/cartsRouter');

const app = express();
const port = 8080;
const uri = "mongodb+srv://hernancandelino:Hernan10.@codercluster.kgh4i25.mongodb.net/ecommerce?retryWrites=true&w=majority";

const environment = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.log("No conectado a MongoDB");
  }
}

environment();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routerCompras);
app.use("/api/carts", cartsRouter);

app.listen(port, () => {})
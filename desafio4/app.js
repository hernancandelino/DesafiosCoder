const express = require('express');
const app = express();
const port = 8080;
const {routerCompras} = require('./routers/productsRouter');
const {cartsRouter} = require('./routers/cartsRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routerCompras);
app.use("/api/carts", cartsRouter);

app.listen(port, () => {})
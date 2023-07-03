const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const  mongoose  = require('mongoose')
const {routerCompras} = require('./routers/productsRouter');
const {cartsRouter} = require('./routers/cartsRouter');

const app = express();
const port = 8080;
const uri = "mongodb+srv://hernancandelino:Hernan10.@codercluster.kgh4i25.mongodb.net/Ecommerce?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});
async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    await client.close();
  }
}
run().catch(console.dir);
mongoose.connect(uri);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routerCompras);
app.use("/api/carts", cartsRouter);

app.listen(port, () => {})
const mongoose = require('mongoose');

const cartCollection = "carts";

const cartSchema = new mongoose.Schema ({
    carrito: {
        type: [
          {
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "products",
            },
            cantidad: {
              type: Number,
              default: 1,
              index: true
            }
          }
        ],
        default: [],
      }
});

const cartModel = mongoose.model(cartCollection, cartSchema);

cartSchema.pre("find", function() {
  this.populate("carrito.product");
})

module.exports = {
  cartModel
}
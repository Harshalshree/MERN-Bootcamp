var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var {ObjectId} = mongoose.Schema;

const productCartSchema = new Schema({
    product:{
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number,

});

const productCart = mongoose.model("ProductCart", productCartSchema); 

const orderSchema = new Schema({
    products: [productCartSchema],
    transaction_id: {},
    amount:{
        type: Number
    },
    address: String,
    status:{
        type: String,
        default: "Recieved",
        enum:["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true});

const order =  mongoose.model("Order", orderSchema);

module.exports = {order, productCart};
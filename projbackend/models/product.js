var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const {ObjectId} = mongoose.Schema;

const productSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true,
    },
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, {timestamp : true});

module.exports = mongoose.model("Product", productSchema);
const Product = require("../models/product")
const formidable = require("formidable")
const lodash = require("lodash")
const fs = require("fs")

exports.getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product
        next()
    })
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm
    form.keepExtensions = true
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Error with Image File"
            })
        }
        //destructuring the fields
        const { name, description, price, category, stock } = fields

        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ) {
            return res.status(400).json({
                error: "All fields not included"
            })
        }

        let product = new Product(fields)

        //handling file
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File size limit exceeded"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        //saving product in db
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Saving product in db failed"
                })
            }
            res.json(product)
        })
    })
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

//middleware
exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}
const Product = require("../models/product")
const formidable = require("formidable")
const lodash = require("lodash")
const fs = require("fs")
const { parse } = require("path")

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

exports.deleteProduct = (req, res) => {
    const product = req.product
    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: "Product could not be deleted"
            })
        }
        return res.json({
            message: "Deletion successful",
            deletedProduct
        })

    })
}

exports.updateProduct = (req, res) => {
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

        //updation code
        let product = req.product
        product = lodash.extend(product, fields)

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
                    error: "Updation in db failed"
                })
            }
            res.json(product)
        })
    })
}

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
        if(err){
            return res.status(400).json({
                error: "No products found"
            })
        }
        return res.json(products)
    })
}

exports.updateStock = (req, res, next) => {
    let Operations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod.id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })
    Product.bulkWrite(Operations, {}, (err, products)=>{
        if(err){
            return res.status(400).json({
                error:"Bulk operation failed"
            })
        }
        next()
    })
}

exports.getAllUniqueCategories  = (req, res) => {
    Product.distinct("category", {}, (err, categories) => {
        if(err){
            return res.status(400).json({
                error:"No categories found"
            })
        }
        res.json(categories)
    })
}
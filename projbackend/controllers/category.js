const category = require("../models/category")
const Category = require("../models/category")

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            res.status(400).json({
                error: "Category not found in database"
            })
        }
        req.category = category
        next()
    })
}
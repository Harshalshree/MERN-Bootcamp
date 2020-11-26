const Category = require("../models/category")

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category not found in database"
            })
        }
        req.category = category
        next()
    })
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body)
    category.save((err, category) => {
        if(err || !category){
            return res.status(400).json({
                error: "Not able to save category in database"
            })
        }
        return res.json({category})
        
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category)
}

exports.getAllCategory= (req, res) => {
    Category.find().exec((err, categories) => {
        if(err || !categories){
            return res.status(400).json({
                error: "No categories found"
            })
        }
        return res.json(categories)
    })
}

exports.updateCategory = (req, res) => {
    const category = req.category
    category.name = req.body.name
    category.save((err, updatedCategory) =>{
        if(err){
            return res.status(400).json({
                error: "Failed to update category"
            })
        }
        return res.json(updatedCategory)
    })
}

exports.deleteCategory = (req, res) => {
    const category = req.category
    category.remove((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete category"
            })
        }
        return res.json({
            message: `${category.name} category deleted successfully`
        })
    })
}
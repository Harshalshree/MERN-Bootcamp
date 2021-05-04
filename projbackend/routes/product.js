var express = require('express')
var router = express.Router()

const {getProductById, createProduct, getProduct, photo, updateProduct, deleteProduct, getAllProducts, getAllUniqueCategories} = require("../controllers/product")
const {getUserById} = require("../controllers/user")
const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth")
const { update } = require('../models/user')

router.param("userId", getUserById)
router.param("productId", getProductById)

//Create
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)

//Read
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo) 

//Update
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)

//Delete
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct)


//Listing 
router.get("/products", getAllProducts)
router.get("/products/categories", getAllUniqueCategories)

module.exports = router
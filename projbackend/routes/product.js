var express = require('express')
var router = express.Router()

const {getProductById, createProduct} = require("../controllers/product")
const {getUserById} = require("../controllers/user")
const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth")

router.param("userId", getUserById)
router.param("productId", getProductById)

router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)


module.exports = router
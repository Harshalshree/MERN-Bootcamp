var express = require('express')
var router = express.Router()

const {getUserById, pushOrderInPurchaseList} = require("../controllers/user")
const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth")
const {updateStock} = require("../controllers/product")
const {getOrderById} = require("../controllers/order")

router.param("userId", getUserById)
router.param("orderId", getOrderById)


module.exports = router
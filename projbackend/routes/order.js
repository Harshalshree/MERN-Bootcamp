var express = require('express')
var router = express.Router()

const {getUserById, pushOrderInPurchaseList} = require("../controllers/user")
const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth")
const {updateStock} = require("../controllers/product")
const {getOrderById, createOrder, getAllOrders} = require("../controllers/order")

router.param("userId", getUserById)
router.param("orderId", getOrderById)

router.post("/order/create/:userId", isSignedIn, isAuthenticated,pushOrderInPurchaseList,updateStock, createOrder)

router.get("order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)

module.exports = router
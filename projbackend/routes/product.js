var express = require('express')
var router = express.Router()

const {getProductbyId} = require("../controllers/product")
const {getUserById} = require("../controllers/user")
const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth")

router.param("userId", getUserById)
router.param("productId", getProductbyId)


module.exports = router
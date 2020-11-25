var express = require('express')
var router = express.Router()

const {} = require('../controllers/category')
const {isAdmin, isAuthenticated, isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user ')

router.param("userId", getUserByID)
router.param("categoryId", getCategoryById)




module.exports = router;
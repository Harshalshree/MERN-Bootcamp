var express = require('express')
var router = express.Router()

const { getUserByID, getUser } = require('../controllers/user')
const { isSignedIn, isAdmin, isAuthenticated} = require('../controllers/auth')

router.param("userId", getUserByID)

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)


module.exports = router


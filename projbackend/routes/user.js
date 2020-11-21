var express = require('express')
var router = express.Router()

const { getUserByID, getUser, updateUser } = require('../controllers/user')
const { isSignedIn, isAdmin, isAuthenticated } = require('../controllers/auth')

router.param("userId", getUserByID)

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)

module.exports = router


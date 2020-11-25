var express = require('express')
var router = express.Router()

const {createCategory, getCategoryById, getCategory, getAllCategory, updateCategory, deleteCategory} = require('../controllers/category')
const {isAdmin, isAuthenticated, isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user ')

//params
router.param("userId", getUserByID)
router.param("categoryId", getCategoryById)

//routes
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory)

router.get("/category/:categoryId", getCategory)
router.get("/categories", getAllCategory)

router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory)

router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteCategory)

module.exports = router;
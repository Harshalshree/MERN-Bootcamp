var express = require('express')
var router = express.Router()

const { check } = require('express-validator');
const {signout, signup, signin} = require("../controllers/auth")

router.post("/signup", [
    check("name").isLength({min:2}).withMessage("Name should be at least 2 characters"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").isLength({min:3}).withMessage("Password should be at least 3 characters is"),
], signup)

router.get("/signout", signout)

router.post("/signin", [
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({min:3}).withMessage("Password is required"),
], signin)


module.exports = router
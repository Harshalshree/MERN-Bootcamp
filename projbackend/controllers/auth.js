const User = require("../models/user")
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


exports.signup = (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg,
            param : errors.array()[0].param
        })
    }

    const user = new User(req.body);
    user.save((err, user) =>{
        if(err){
            return res.status(400).json({
                err:"Unable to signup user"
            })
        }
    res.json({
        name: user.name,
        email: user.email,
        id: user._id
    })
    })
}

exports.signin = (req, res) => {
    const {email, password} = req.body
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg,
            param : errors.array()[0].param
        })
    }
    User.findOne({email}, (err, user)=>{
        if(err){
            return res.status(400).json({
                err:"User email does not exist"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email or Password Incorrect",
            })
        }
        const token = jwt.sign({_id: user._id}, process.env.SECRET)

        //put token in cookie
        res.cookie("token", token, {expires: new Date() + 9999})

        //send response to frontend
        const {_id, name, email, role} = user
        res.json({
            token,
            user: {_id, name, email, role}
        }) 
    })
}

exports.signout = (req, res) => {
    res.json({
        message : "User Signed Out",
        
    })
}




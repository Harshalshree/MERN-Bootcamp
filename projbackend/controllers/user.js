const User = require("../models/user")

exports.getUserByID = (req,res,next,id) => {
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            res.status(400).json({
                error: "User not found in database"
            })
        }
        req.profile = user
        next()
    })
}

exports.getUser = (req,res) => {
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req,profile.updatedAt = undefined

    return res.json(req.profile)
}
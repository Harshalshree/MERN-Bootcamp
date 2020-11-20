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
    //TODO: get back here for password
    return res.json(req.profile)
}
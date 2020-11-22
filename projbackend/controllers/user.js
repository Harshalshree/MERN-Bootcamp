const User = require("../models/user")
const Order = require("../models/order")

exports.getUserByID = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            res.status(400).json({
                error: "User not found in database"
            })
        }
        req.profile = user
        next()
    })
}

exports.getUser = (req, res) => {
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    return res.json(req.profile)
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "Update unsuccessful"
                })
            }
            user.salt =undefined
            user.encry_password = undefined
            res.json(user)
        }
    )
}

exports.getUserPurchaseList = (req, res) => {
    Order.find({user: req.profile._id})
    .populate("user", "_id name email")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "No orders found for this account"
            })
        }
        return res.json(order)
    })
}
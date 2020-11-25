const User = require("../models/user")
const Order = require("../models/order")

exports.getUserById = (req, res, next, id) => {
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

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = []
    req.body.order.products.forEach(item => {
      purchases.push({
          _id: item.id_,
          name: item.name,
          description: item.description,
          category: item.category,
          quantity: item.quantity,
          amount: req.body.order.amount,
          transactionId: req.body.order.transactionId
      })  
    })
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err, purchase) => {
            if(err){
                return res.json(400).json({
                    error: "Unable to update purchase list"
                })
            }
            next()
        }
    )
}
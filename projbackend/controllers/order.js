const {Order, ProductCart} = require("../models/order")

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
        if (err || !order) {
            return res.status(400).json({
                error: "Order not found"
            })
        }
        req.order = order
        next()
    })
}


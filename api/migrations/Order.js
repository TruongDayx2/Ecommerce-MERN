const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, require: true, ref : 'User'},
        products: [
            {
                productId: {
                    type: String,
                    require: true,
                    ref : 'Product'
                },
                quantity: {
                    type: Number,
                    default: 1
                },
                color: {
                    type: String,
                },
                size: {
                    type: String,
                },
            }
        ],
        amount: { type: Number, require: true },
        address: { type: Object, require: true },
        status: {type:String, default:'pending'}
    },
    { timestamps: true }
)

module.exports = mongoose.model("Order", OrderSchema)
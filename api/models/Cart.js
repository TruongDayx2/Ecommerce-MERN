const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product"
                },
                quantity:{
                    type:Number,
                    default:1
                },
                size:{
                    type:String
                },
                color:{
                    type:String
                }
            }
        ],
    },
    {timestamps:true}
)

module.exports = mongoose.model("Cart",CartSchema)
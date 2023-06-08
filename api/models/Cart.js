const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, require: true, ref:"User"},
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
        amount: {
            type: Number,
            default: 0,
        },
        Address: {
            type: String,
            default: "",
            },  
        status: {
            type: String,
            default: "pending",
            },
        phone: {
            type: String,
            default: "",
            },

    },
    {timestamps:true}
)

module.exports = mongoose.model("Cart",CartSchema)
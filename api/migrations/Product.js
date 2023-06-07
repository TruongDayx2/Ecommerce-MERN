const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, require: true, unique: true },
        desc: { type: String, require: true},
        img: { type: String, require: true },
        sex:{ type:String, require: true},
        price: { type: Number, require: true },
        inStock:{type : Boolean, default:true},
        category:{type: String},
        size_color:{type: Object}
    },
    {timestamps:true}
)

module.exports = mongoose.model("Product",ProductSchema)
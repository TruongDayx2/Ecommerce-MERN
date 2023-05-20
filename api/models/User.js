const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        isAdmin: {
            type: Boolean, default: false
        },
        img:{type:String},
        name:{type:String,require:true},
        lastname:{type:String,require:true}
    },
    {timestamps:true}
)

module.exports = mongoose.model("User",UserSchema)
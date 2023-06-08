const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        img: { type: String },
        isAdmin: {
            type: Boolean, default: false
        },
        name:{type:String,require:true},
        lastname:{type:String,require:true}
    },
    { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['female', 'male', 'other'],
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    logo: {
        type: String,
        required: false
    },
    coverphoto: {
        type: String,
        required: false
    },
    likedPostIds: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
})

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            email: this.email,
            user_id: this._id.toString(),
        }, "sunita");
    } catch (error) {
        console.log(error);
    }
}


const User = new mongoose.model("User", userSchema);

module.exports = User;
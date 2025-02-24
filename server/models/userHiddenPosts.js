const mongoose = require("mongoose");
const hiddenSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true
    },
    isHidden: {
        type: Number,
        required: true,
        enum: [0, 1]
    }
})

const UserHiddenPosts = new mongoose.model("UserHiddenPosts", hiddenSchema);

module.exports = UserHiddenPosts
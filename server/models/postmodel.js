const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    loginId: {
        type: String,
        required: true
    },
    loginDp: {
        type: String,
        required: false
    },
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        required: false
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: [commentSchema],
        default: []
    }
});

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
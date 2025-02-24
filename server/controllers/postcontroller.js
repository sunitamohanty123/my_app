const Post = require("../models/postmodel");
const User = require("../models/usermodel");
const UserHiddenPosts = require("../models/userHiddenPosts")
const createPost = async (req, res) => {
    const { description } = req.body;
    const loginData = req.user;

    console.log(req.file);

    const image = req.file ? req.file.path : '';
    console.log(description, image, loginData);
    const response = await Post.create({ description, image, username: `${loginData.firstname} ${loginData.lastname}`, loginId: loginData._id, loginDp: loginData.logo, createdAt: new Date() });
    res.status(200).json({ data: response });
}
const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.status(200).json({ posts });
}
const hidePost = async (req, res) => {
    console.log(req.body);

    const { post_id } = req.body;
    const user_id = JSON.stringify(req.user._id).slice(1, -1);
    const isHidden = 1;
    console.log(post_id, user_id, isHidden);

    const response = await UserHiddenPosts.create({ user_id, post_id, isHidden });
    res.status(200).json({ response });

}
const getHiddenPosts = async (req, res) => {
    const user_id = req.user._id;
    const response = await UserHiddenPosts.find({ "user_id": user_id });
    res.status(200).json({ response });
}
const editPost = async (req, res) => {
    const { description, id } = req.body;
    let image;
    if (req.file && req.file.path) {
        image = req.file.path;
    }
    const response = await Post.updateOne({ "_id": id }, { $set: { description, image, updatedAt: new Date() } });
    res.status(200).json({ response });
}

const likesCount = async (req, res) => {
    const post_id = req.params.id;
    const user_id = req.user._id;

    const response = await Post.updateOne({ "_id": post_id }, { $inc: { "likes": 1 } });
    const user_response = await User.updateOne({ _id: user_id }, { $addToSet: { likedPostIds: post_id } })
    console.log(post_id, user_id, response, user_response);
    res.status(200).json({ response, user_response });
}
const getLikesIds = async (req, res) => {
    const user_id = req.user._id;
    const response = await User.findOne({ _id: user_id }).select('likedPostIds').lean();
    console.log(response, "jii");
    const ids = response.likedPostIds ? response.likedPostIds : [];
    res.status(200).json({ ids });
}
const addComments = async (req, res) => {
    const { text, name, logo, id } = req.body[0];
    const user_id = req.user._id;
    console.log(text, name, logo, id, user_id, req.body);
    const data = await Post.updateOne({ _id: id }, { $push: { comments: { text, name, logo, user_id } } })
    const response = await Post.findOne({ _id: id }).select("comments").lean();
    console.log(response);

    res.status(200).json({ response });
}
module.exports = { createPost, getPosts, hidePost, getHiddenPosts, editPost, likesCount, getLikesIds, addComments }
const User = require("../models/usermodel");
const bcryptjs = require("bcryptjs");
const Post = require("../models/postmodel");
const register = async (req, res) => {
    const { firstname, lastname, email, password, gender, dob } = req.body;

    const userExist = await User.findOne({ "email": email });
    console.log(userExist);

    if (userExist) {
        return res.status(401).json({ msg: "email alreday exist" });
    }
    const hash_pw = await bcryptjs.hash(password, 10);
    const response = await User.create({ firstname, lastname, email, password: hash_pw, gender, dob });
    console.log(response);

    return res.status(200).json({ msg: "registered succesfull", data: response, token: await response.generateToken() });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const useExist = await User.findOne({ "email": email });
    if (!useExist) {
        return res.status(401).json({ msg: "user is not exist" });
    }
    const cpmaprePw = await bcryptjs.compare(password, useExist.password);
    if (cpmaprePw) {
        return res.status(200).json({ msg: "login succesfull", data: useExist, token: await useExist.generateToken() });
    } else {
        return res.status(401).json({ msg: "Invalid credential" });
    }
}

const user = async (req, res) => {
    try {
        console.log(req.token);
        const response = req.user;
        if (response) {
            return res.status(200).json({ response });
        }
        return res.status(400).json({ msg: "invalid data" });
    } catch (error) {
        console.log(error);
    }
}
const getPostByUser = async (req, res) => {
    const user_id = req.user_id;
    const response = await Post.find({ "loginId": user_id })
    res.status(200).json({ response })
}

const deletePostByUser = async (req, res) => {
    const post_id = req.params.id;
    const response = await Post.deleteOne({ "_id": post_id });
    res.status(200).json({ msg: "deleted successfully" });
}
const updateUser = async (req, res) => {
    const user_id = req.params.id;
    const { firstname, lastname, bio } = req.body;
    console.log(req.files, req.body, firstname, lastname, bio, user_id);
    let logo;
    let coverphoto;
    if (req.files && req.files.logo) {
        logo = req.files.logo[0].path;
    }
    if (req.files && req.files.coverphoto) {
        coverphoto = req.files.coverphoto[0].path;
    }
    console.log(logo, coverphoto);
    const response = await User.updateOne({ _id: user_id }, {
        $set: { firstname, lastname, logo, coverphoto, bio }
    })
    res.status(200).json({ data: response });
}
module.exports = { register, login, user, getPostByUser, deletePostByUser, updateUser };
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        res.status(400).json({ msg: "token is not here" });
    }
    const jwtToken = token.replace("Bearer", "").trim();

    try {
        const isVerified = jwt.verify(jwtToken, "sunita");
        // console.log(isVerified);

        const LoginUser = await User.findOne({ _id: isVerified.user_id }).select({ password: 0 });
        console.log(LoginUser);
        req.user = LoginUser;
        req.token = jwtToken;
        req.user_id = LoginUser._id;
        next()
    } catch (error) {
        res.status(401).json("Invalid token");
    }
}
module.exports = authMiddleware
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller")
const authMiddleware = require("../middleware/authmiddleware");
const upload = require("../middleware/imagemiddleware");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/user").get(authMiddleware, authController.user);
router.route("/getuserpost").get(authMiddleware, authController.getPostByUser);
router.route("/deletepostbyuser/:id").delete(authMiddleware, authController.deletePostByUser);
router.route("/edit/:id").patch(authMiddleware, upload, authController.updateUser);

module.exports = router;
const express = require("express")
const router = express.Router();
const postController = require("../controllers/postcontroller");
const authMiddleware = require("../middleware/authmiddleware");
const upload = require("../middleware/createPostmiddleware");

router.route("/createpost").post(authMiddleware, upload, postController.createPost);
router.route("/getposts").get(authMiddleware, postController.getPosts);
router.route("/hide").post(authMiddleware, postController.hidePost);
router.route("/hideposts").get(authMiddleware, postController.getHiddenPosts);
router.route("/editpost").patch(authMiddleware, upload, postController.editPost);

router.route("/likes/:id").patch(authMiddleware, postController.likesCount);
router.route("/getlikesids").get(authMiddleware, postController.getLikesIds);
router.route("/comments").post(authMiddleware, postController.addComments);
module.exports = router;
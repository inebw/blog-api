const { Router } = require("express");
const {
  getPosts,
  addPost,
  getPost,
  deletePost,
  updatePost,
} = require("../controllers/posts");
const authenticateToken = require("../config/authenticateToken");

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", authenticateToken, addPost);
router.delete("/:id", authenticateToken, deletePost);
router.put("/:id", authenticateToken, updatePost);


module.exports = router;

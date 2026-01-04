const { Router } = require("express");
const {
  getPosts,
  addPost,
  getPost,
  deletePost,
} = require("../controllers/posts");

const router = Router();

router.get("/", getPosts);
router.post("/", addPost);
router.get("/:id", getPost);
router.delete("/:id", deletePost);

module.exports = router;

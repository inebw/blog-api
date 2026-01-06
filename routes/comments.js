const { Router } = require("express");
const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");
const verifyUser = require("../config/verifyUser");
const authenticateToken = require("../config/authenticateToken");


const router = Router();

router.get("/:id", getComments);
router.post("/:id", verifyUser, addComment);
router.put("/:comment_id", updateComment);
router.delete("/:comment_id", authenticateToken, deleteComment);

module.exports = router;

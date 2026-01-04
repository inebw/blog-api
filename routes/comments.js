const { Router } = require("express");
const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

const router = Router();

router.get("/:id", getComments);
router.post("/:id", addComment);
router.put("/:comment_id", updateComment);
router.delete("/:comment_id", deleteComment);

module.exports = router;

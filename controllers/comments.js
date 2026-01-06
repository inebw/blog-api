const { prisma } = require("../lib/prisma");
const { body, validationResult, matchedData } = require("express-validator");

const getComments = async (req, res) => {
  const post_id = parseInt(req.params.id);
  const comments = await prisma.comment.findMany({
    where: {
      post_id,
    },
    include: {
      user: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          username: true,
        },
      },
    },
  });
  res.json(comments);
};

const verifyComment = [
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Comment cannot be empty")
    .isLength({ max: 300 })
    .withMessage("Comment should be within 300 characters"),
];

const addComment = [
  verifyComment,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json(errors.array());
    else {
      const post_id = parseInt(req.params.id);
      const { content } = matchedData(req);
      await prisma.comment.create({
        data: {
          post_id,
          content,
          user_id: req.user ? parseInt(req.user.id) : null,
        },
      });
      res.sendStatus(201);
    }
  },
];

const updateComment = [
  verifyComment,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json(errors.array());
    else {
      const { comment_id } = req.params;
      const { content } = matchedData(req);
      console.log(content);
      await prisma.comment.update({
        data: { content: content },
        where: { id: parseInt(comment_id) },
      });
      res.sendStatus(201);
    }
  },
];

const deleteComment = async (req, res) => {
  const { comment_id } = req.params;
  try {
    await prisma.comment.delete({
      where: {
        id: parseInt(comment_id),
        user_id: parseInt(req.user.id),
      },
    });
  } catch (e) {
    console.log(e);
  }
  res.sendStatus(203);
};

module.exports = {
  getComments,
  addComment,
  updateComment,
  deleteComment,
};

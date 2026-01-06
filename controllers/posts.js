const { prisma } = require("../lib/prisma");
const { body, validationResult, matchedData } = require("express-validator");

const getPosts = async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
};

const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(post);
};

const validatePost = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 300 })
    .withMessage("Title should has atleast 3 characters")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Title should contain only letters and numbers"),
  body("content")
    .trim()
    .isLength({ min: 100 })
    .withMessage("Post should be at least 100 characters long"),
];

const addPost = [
  validatePost,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json(errors.array());
    else {
      const author_id = parseInt(req.user.id);
      const { title, content } = matchedData(req);
      const post = {
        author_id,
        title,
        content,
      };
      await prisma.post.create({ data: post });
      res.sendStatus(201);
    }
  },
];

const updatePost = [
  validatePost,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json(errors.array());
    else {
      const { id } = req.params;
      const { title, content } = matchedData(req);
      await prisma.post.update({
        data: { title, content },
        where: { id: parseInt(id) },
      });
      res.sendStatus(201);
    }
  },
];

const deletePost = async (req, res) => {
  const { id } = req.params;
  await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.sendStatus(204);
};

module.exports = {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
};

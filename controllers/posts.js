const { prisma } = require("../lib/prisma");
const { sentence, article } = require("txtgen");

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

const addPost = async (req, res) => {
  const post = {
    author_id: 1,
    title: sentence(),
    content: article(),
  };
  await prisma.post.create({ data: post });
  res.sendStatus(201);
};

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
  deletePost,
};

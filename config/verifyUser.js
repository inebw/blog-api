const jwt = require("jsonwebtoken");
const { prisma } = require("../lib/prisma");

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) next()
  else {
    jwt.verify(token, process.env.SECRET, async (err, authData) => {
      if (err) next()
      else {
        const { id } = authData;
        const user = await prisma.user.findUnique({
          where: { id: parseInt(id) },
        });
        req.user = user;
        next();
      }
    });
  }
};

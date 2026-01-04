const jwt = require("jsonwebtoken");
const { prisma } = require("../lib/prisma");

module.exports = async (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET, async (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      const { id } = authData;
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
      req.user = user;
      next();
    }
  });
};

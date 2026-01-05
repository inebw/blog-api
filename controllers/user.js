const { prisma } = require("../lib/prisma");

module.exports = async (req, res) => {
  const id = parseInt(req.user.id);
  const user = await prisma.user.findUnique({
    select: { id: true, username: true, first_name: true, last_name: true },
    where: { id: id },
  });
  res.json(user);
};

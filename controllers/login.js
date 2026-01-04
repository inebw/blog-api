const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const token = jwt.sign({ id: req.user.id }, process.env.SECRET, {
    expiresIn: "1d",
  });
  res.json({ token });
};

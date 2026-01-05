const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const token = jwt.sign({ id: req.user.id }, process.env.SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.IS_PROD === "PROD" ? true : false,
    sameSite: process.env.IS_PROD === "PROD" ? "none" : "lax",
  });
  const user = {
    id: req.user.id,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    username: req.user.username,
  };
  res.json(user);
};

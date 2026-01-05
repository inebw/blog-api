module.exports = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.IS_PROD === "PROD" ? true : false,
    sameSite: process.env.IS_PROD === "PROD" ? "none" : "strict",
  });
  res.json({message:"Logged out successfully"})
};

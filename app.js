require("dotenv").config();
const express = require("express");
const posts = require("./routes/posts");
const signUp = require("./routes/sign-up");
const login = require("./routes/login");
const verifyToken = require("./config/verifyToken");
const authenticateToken = require("./config/authenticateToken");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./config/passport");

app.use("/posts", verifyToken, authenticateToken, posts);
app.use("/sign-up", signUp);
app.use("/login", login);

app.listen(port, (err) => {
  if (err) console.error(err);
  else console.log(`Listening on port: ${port}`);
});

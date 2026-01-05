require("dotenv").config();
const express = require("express");
const posts = require("./routes/posts");
const signUp = require("./routes/sign-up");
const login = require("./routes/login");
const comments = require("./routes/comments");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const logout = require("./routes/logout");
const user = require("./routes/user");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

require("./config/passport");

app.use("/posts", posts);
app.use("/comments", comments)
app.use("/sign-up", signUp);
app.use("/login", login);
app.use("/logout", logout)
app.use("/user", user)

app.listen(port, (err) => {
  if (err) console.error(err);
  else console.log(`Listening on port: ${port}`);
});

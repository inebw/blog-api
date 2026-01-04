require("dotenv").config();
const express = require("express");
const posts = require("./routes/posts");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/posts", posts);

app.listen(port, (err) => {
  if (err) console.error(err);
  else console.log(`Listening on port: ${port}`);
});

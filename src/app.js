const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/user/login", (req, res) => {
  res.send("User Logged in successfully!");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("User  Data sent");
});

app.get("/user/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777");
});

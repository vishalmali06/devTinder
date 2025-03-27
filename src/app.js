const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
  // Logic of DB call and get user data
  throw new Error("dfsadfdsafß");
  res.send("User Data Sent");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your error
    res.status(500).send("something went wrong");
  }
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777");
});

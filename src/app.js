const express = require("express");

const app = express();

// This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Vishal", lastName: " Mali" });
});

app.post("/user", (req, res) => {
  console.log("Save Data to the database");
  res.send("Data successfully saved in the database");
});

app.delete("/user", (req, res) => {
  console.log("Delete Data from the database");
  res.send("Data Deleted successfully");
});

// this will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
  res.send("Hello test Server!!");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777");
});

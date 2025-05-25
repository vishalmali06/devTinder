const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating new istance of the User Model
  const userObj = new User(req.body);

  try {
    await userObj.save();
    res.send("User Added sucessfully!");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("✅ Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777");
    });
  })
  .catch((error) => {
    console.error("❌ Database cannot be connected!:", error.message);
  });

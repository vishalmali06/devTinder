const express = require("express");
const authRouter = express.Router();
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");

authRouter.post("/signup", validateSignUpData, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, emailId, password } = req.body;

  try {
    // 🔐 Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 🧩 Create user object properly
    const userObj = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    // 💾 Save to DB
    await userObj.save();
    res.send("✅ User added successfully!");
  } catch (err) {
    res.status(400).send("❌ Error saving the user: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).send("❌ Invalid credentials");
    }
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      return res.status(401).send("❌ Invalid credentials");
    }
    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.send(user);
  } catch (err) {
    res.status(400).send("❌ ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!");
});

module.exports = authRouter;

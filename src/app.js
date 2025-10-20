const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const {
  signupValidation,
  updateUserValidation,
  deleteUserValidation,
} = require("./utils/validation");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signup", signupValidation, async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // 🧩 Check if user exists
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).send("❌ Invalid credentials");
    }

    // 🔐 Compare password
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      return res.status(401).send("❌ Invalid credentials");
    }

    const token = await user.getJWT();

    console.log(token);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    // ✅ Successful login
    res.send("✅ Login successful!");
  } catch (err) {
    res.status(400).send("❌ ERROR: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.send(user);
  } catch (err) {
    res.status(401).send("ERROR: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending connection request");
  res.send(user.firstName + " Send the Connection Request!");
});

// GET /user - Get user by email from request body
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      return res.status(404).send("❌ User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

// Delete the uer from the database
app.delete("/user", deleteUserValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await User.findByIdAndDelete(req.body.userId);
    res.send("✅ User deleted successfully!");
  } catch (err) {
    res.status(400).send("❌ Something went wrong: " + err.message);
  }
});

// Update the User from the database
app.patch("/user", updateUserValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, ...data } = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      return res.status(400).send("❌ Some fields are not allowed for update");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("❌ User not found");
    }

    res.send("✅ User updated successfully");
  } catch (err) {
    res.status(400).send("❌ Update Failed: " + err.message);
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

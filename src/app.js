const express = require("express");
const { body, check, validationResult } = require("express-validator");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post(
  "/signup",
  [
    body("firstName")
      .notEmpty()
      .withMessage("First name is required")
      .isString()
      .withMessage("First name must be a string"),

    body("lastName")
      .optional()
      .isString()
      .withMessage("Last name must be a string"),

    body("emailId")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    body("age")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Age must be a valid positive number"),

    body("gender")
      .optional()
      .isIn(["male", "female", "other"])
      .withMessage("Gender must be male, female, or other"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userObj = new User(req.body);
      await userObj.save();
      res.send("✅ User added successfully!");
    } catch (err) {
      res.status(400).send("❌ Error saving the user: " + err.message);
    }
  }
);

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
app.delete(
  "/user",
  [body("userId").isMongoId().withMessage("Invalid userId")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await User.findByIdAndDelete(req.body.userId);
      res.send("✅ User deleted successfully");
    } catch (err) {
      res.status(400).send("❌ Something went wrong: " + err.message);
    }
  }
);

// Update the User from the database
app.patch(
  "/user",
  [
    body("userId")
      .notEmpty()
      .withMessage("User ID is required")
      .isMongoId()
      .withMessage("Invalid User ID format"),

    // Optional but validated fields
    body("photoUrl")
      .optional()
      .isURL()
      .withMessage("photoUrl must be a valid URL"),

    body("about")
      .optional()
      .isString()
      .isLength({ max: 200 })
      .withMessage("About section too long (max 200 chars)"),

    body("gender")
      .optional()
      .isIn(["male", "female", "other"])
      .withMessage("Gender must be male, female, or other"),

    body("age")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Age must be a valid positive number"),

    body("skills")
      .optional()
      .isArray()
      .withMessage("Skills must be an array of strings"),
  ],
  async (req, res) => {
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
        return res
          .status(400)
          .send("❌ Some fields are not allowed for update");
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
  }
);

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

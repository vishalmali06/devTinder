// utils/validation.js
const { body } = require("express-validator");

const validateSignUpData = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("First name must contain only letters"),

  body("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be a string")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Last name must contain only letters"),

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
];

// const validateEditProfile = [
//   body("userId")
//     .notEmpty()
//     .withMessage("User ID is required")
//     .isMongoId()
//     .withMessage("Invalid User ID format"),

//   body("photoUrl")
//     .optional()
//     .isURL()
//     .withMessage("photoUrl must be a valid URL"),

//   body("about")
//     .optional()
//     .isString()
//     .isLength({ max: 200 })
//     .withMessage("About section too long (max 200 chars)"),

//   body("gender")
//     .optional()
//     .isIn(["male", "female", "other"])
//     .withMessage("Gender must be male, female, or other"),

//   body("age")
//     .optional()
//     .isInt({ min: 1 })
//     .withMessage("Age must be a valid positive number"),

//   body("skills")
//     .optional()
//     .isArray()
//     .withMessage("Skills must be an array of strings"),
// ];

const validateEditProfile = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfile,
};

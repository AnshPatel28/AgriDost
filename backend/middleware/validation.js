const { body, validationResult } = require('express-validator');

// Middleware to validate user signup
const validateSignup = [
  // Validate and sanitize fields
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim()
    .escape(),
  
  body('email')
    .isEmail()
    .withMessage('Enter a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  // Custom middleware to handle validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateSignup;

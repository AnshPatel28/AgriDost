const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from the Authorization header
  const authHeader = req.header('Authorization');

  // Check if the Authorization header exists and is formatted as "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }

  // Extract the token part from the header (Bearer <token>)
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token with the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request (you can store other details as needed)
    req.user = decoded.userId; // Ensure this matches how you set userId in the token during token creation

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Catch any error during token verification
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

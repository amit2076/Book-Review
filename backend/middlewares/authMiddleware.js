import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Middleware to check authentication
const authMiddleware = async (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided. Authorization denied.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Retrieve the user from the database
    const user = await User.findById(decoded.id).select('-password');

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'User not found. Authorization denied.' });
    }

    // Attach the user object to the request for further use
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle invalid token
    res.status(401).json({ message: 'Invalid token. Authorization denied.' });
  }
};

export default authMiddleware;

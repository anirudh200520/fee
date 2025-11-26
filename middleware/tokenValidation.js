import jwt from 'jsonwebtoken';

// Hardcoded JWT Secret (No .env needed)
const JWT_SECRET = 'your-super-secret-jwt-key-change-this-in-production-123456789';

const validateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  console.log(token);

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized Please login' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized Please login' });
  }
};

export default validateToken;
export { JWT_SECRET };
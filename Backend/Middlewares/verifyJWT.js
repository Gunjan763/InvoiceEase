import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyJWT = async (req, res, next) => {
  const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Access denied. Token missing.',
    });
  }

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken;
    console.log("request user email: " + req.user.email);
    console.log("passed from jwt verification by middleware");
    next();
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};

export default verifyJWT;

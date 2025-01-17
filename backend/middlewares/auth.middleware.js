import jwt from "jsonwebtoken";
import "dotenv/config";

const tokenValidationMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(" ")[1] : req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "User unauthorized. Token missing." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
export default tokenValidationMiddleware;

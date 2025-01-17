import UserModel from "../models/user.model.js";

const apiKeyValidationMiddleware = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"]|| req.query.api_key;

    if (!apiKey) {
      return res.status(401).json({ message: "API key missing." });
    }

    const user = await UserModel.findOne({ api_key: apiKey });
    if (!user) {
      return res.status(403).json({ message: "Invalid API key." });
    }

    req.user = user; 
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

export default apiKeyValidationMiddleware;

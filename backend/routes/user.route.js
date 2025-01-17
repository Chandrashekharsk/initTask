import { Router } from "express";
import { 
  register, 
  login, 
  updateProfile, 
  getProfile, 
  getAllUsers, 
  logout
} from "../controllers/user.controller.js";
import apiKeyValidationMiddleware from "../middlewares/apikeyValidation.middlware.js";
import tokenValidationMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", tokenValidationMiddleware, getProfile);
router.put("/profile", tokenValidationMiddleware, updateProfile);
router.get("/all", apiKeyValidationMiddleware, getAllUsers);
router.get("/logout", tokenValidationMiddleware, logout);

export default router;

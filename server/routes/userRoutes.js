import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { validateJwtToken } from "../middlewares/jwtAuthMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", validateJwtToken, loginUser);

export default router;

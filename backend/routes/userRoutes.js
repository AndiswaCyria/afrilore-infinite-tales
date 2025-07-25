import express from "express";
import { registerUser, loginUser, getMe, startTrial, subscribeUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/start-trial", startTrial);
router.post("/subscribe", subscribeUser);

export default router;


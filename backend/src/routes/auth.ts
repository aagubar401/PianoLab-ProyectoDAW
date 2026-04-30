import { Router } from "express";
import { register, login, upgradeToPremium } from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/upgrade", upgradeToPremium);
export default router;

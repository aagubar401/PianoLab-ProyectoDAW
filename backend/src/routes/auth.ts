import { Router } from "express";
import { register, login, upgradeToPremium, downgradeToBasic } from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/upgrade", upgradeToPremium);
router.post("/downgrade", downgradeToBasic);
export default router;

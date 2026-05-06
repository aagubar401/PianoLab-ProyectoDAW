import { Router } from "express";
import { sendSupportEmail } from "../controllers/supportController";

const router = Router();

router.post("/", sendSupportEmail);

export default router;

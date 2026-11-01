import { Router } from "express";
import { getUserDetails } from "../controllers/user.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
const router= Router();

router.get('/details', authenticateUser, getUserDetails);

export default router;
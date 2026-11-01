import { Router } from "express";
import { generateShortUrl,getShortUrl } from "../controllers/shortUrl.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
const router= Router();

router.get('/:URL', authenticateUser, getShortUrl);
router.post('/create', authenticateUser, generateShortUrl);

export default router;
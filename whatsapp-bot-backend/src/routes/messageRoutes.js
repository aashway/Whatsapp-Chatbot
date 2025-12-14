import express from "express";
import { sendBulkMessage } from "../controllers/messageController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// 🔐 Protected route (login required)
router.post("/send-bulk", auth, sendBulkMessage);

export default router;

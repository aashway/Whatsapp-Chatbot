import express from "express";
import { sendBulkMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/send-bulk", sendBulkMessage);

export default router;

import express from "express";
import { handleWebhook } from "../controllers/webhookController.js";

const router = express.Router();

router.post("/", handleWebhook);

// for WhatsApp webhook verification (GET request)
router.get("/", (req, res) => {
  const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});


export default router;

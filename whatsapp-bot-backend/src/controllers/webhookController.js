// src/controllers/webhookController.js

import { PrismaClient } from "@prisma/client";
import { sendWhatsAppMessage } from "../services/whatsappService.js";
import { getAIResponse } from "../services/openaiService.js";

const prisma = new PrismaClient();

export const handleWebhook = async (req, res) => {
  try {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];

    if (!message) {
      return res.sendStatus(200);
    }

    const from = message.from;
    const text = message.text?.body || "";

    console.log("📩 Incoming:", from, "|", text);

    // 1️⃣ Find or create contact
    let contact = await prisma.contact.findUnique({
      where: { phoneNumber: from },
    });

    if (!contact) {
      contact = await prisma.contact.create({
        data: {
          phoneNumber: from,
          countryCode: "+91",
        },
      });
    }

    // 2️⃣ Save user message
    await prisma.conversation.create({
      data: {
        contactId: contact.id,
        role: "user",
        message: text,
      },
    });

    // 3️⃣ Fetch last 10 messages for context
    const history = await prisma.conversation.findMany({
      where: { contactId: contact.id },
      orderBy: { createdAt: "asc" },
      take: 10,
    });

    // 4️⃣ Get AI reply (context based)
    const aiReply = await getAIResponse(history);
    console.log("🤖 AI:", aiReply);

    // 5️⃣ Save AI reply
    await prisma.conversation.create({
      data: {
        contactId: contact.id,
        role: "assistant",
        message: aiReply,
      },
    });

    // 6️⃣ Send reply on WhatsApp
    await sendWhatsAppMessage(from, aiReply);

    return res.sendStatus(200);
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return res.sendStatus(500);
  }
};

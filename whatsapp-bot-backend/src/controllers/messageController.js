import { PrismaClient } from "@prisma/client";
import { sendWhatsAppMessage } from "../services/whatsappService.js";

const prisma = new PrismaClient();

export const sendBulkMessage = async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: "Campaign name & message required" });
    }

    const contacts = await prisma.contact.findMany();

    if (contacts.length === 0) {
      return res.status(400).json({ error: "No contacts found" });
    }

    // 1️⃣ Create Campaign
    const campaign = await prisma.campaign.create({
      data: {
        name,
        message,
        totalContacts: contacts.length,
        status: "running",
      },
    });

    let sent = 0;

    // 2️⃣ Send messages (for now mock / real both supported)
    for (const contact of contacts) {
      await sendWhatsAppMessage(contact.phoneNumber, message);
      sent++;
    }

    // 3️⃣ Update campaign
    await prisma.campaign.update({
      where: { id: campaign.id },
      data: {
        sentCount: sent,
        status: "completed",
      },
    });

    return res.json({
      success: true,
      campaignId: campaign.id,
      totalContacts: contacts.length,
      sentCount: sent,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

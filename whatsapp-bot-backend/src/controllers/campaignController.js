import { PrismaClient } from "@prisma/client";
import { sendWhatsAppMessage } from "../services/whatsappService.js";

const prisma = new PrismaClient();

// CREATE campaign (NO sending here)
export const createCampaign = async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: "Name & message required" });
    }

    const contacts = await prisma.contact.findMany();

    const campaign = await prisma.campaign.create({
      data: {
        name,
        message,
        status: "pending",
        totalContacts: contacts.length,
      },
    });

    res.json({ success: true, campaign });
  } catch (err) {
    res.status(500).json({ error: "Create failed" });
  }
};

// EXECUTE campaign (SEND messages)
export const sendCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    const campaign = await prisma.campaign.findUnique({ where: { id } });
    if (!campaign) return res.status(404).json({ error: "Not found" });

    const contacts = await prisma.contact.findMany();

    for (const contact of contacts) {
      await sendWhatsAppMessage(contact.phoneNumber, campaign.message);
      await prisma.campaign.update({
        where: { id },
        data: { sentCount: { increment: 1 } },
      });
    }

    await prisma.campaign.update({
      where: { id },
      data: { status: "completed" },
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Send failed" });
  }
};

// DASHBOARD
export const getCampaigns = async (req, res) => {
  const campaigns = await prisma.campaign.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(campaigns);
};

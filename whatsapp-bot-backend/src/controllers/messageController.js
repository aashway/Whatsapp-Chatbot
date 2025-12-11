import { PrismaClient } from "@prisma/client";
import { sendWhatsAppMessage } from "../services/whatsappService.js";

const prisma = new PrismaClient();

export const sendBulkMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }

    // Get all contacts
    const contacts = await prisma.contact.findMany();

    if (contacts.length === 0) {
      return res.status(400).json({ error: "No contacts found" });
    }

    // Loop and send
    for (const contact of contacts) {
      await sendWhatsAppMessage(contact.phoneNumber, message);
    }

    res.json({
      success: true,
      message: "Bulk message send initiated",
      totalContacts: contacts.length,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const sendBulkMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }

    // get all contacts
    const contacts = await prisma.contact.findMany();

    // loop contacts
    contacts.forEach((contact) => {
      console.log(`Sending message to: ${contact.phoneNumber}`);
      // 👇 later WhatsApp API here
    });

    res.json({
      message: "Bulk message send initiated",
      totalContacts: contacts.length,
      example: contacts[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal error" });
  }
};

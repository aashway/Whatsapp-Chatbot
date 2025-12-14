import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getDashboardStats = async (req, res) => {
  try {
    const totalContacts = await prisma.contact.count();
    const totalMessages = await prisma.conversation.count();
    const replied = await prisma.contact.count({ where: { hasReplied: true } });

    res.json({
      totalContacts,
      totalMessages,
      replied,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

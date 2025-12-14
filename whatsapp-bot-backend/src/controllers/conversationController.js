import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllConversations = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      include: {
        conversations: {
          orderBy: { timestamp: "asc" },
        },
      },
    });

    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
};

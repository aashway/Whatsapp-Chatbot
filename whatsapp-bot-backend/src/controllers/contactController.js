import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 👉 GET ALL CONTACTS
export const getContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { id: "desc" },
    });

    return res.json(contacts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to load contacts" });
  }
};

// 👉 ADD SINGLE CONTACT
export const addContact = async (req, res) => {
  try {
    const { name, number } = req.body;

    if (!number) {
      return res.status(400).json({ error: "number required" });
    }

    const contact = await prisma.contact.create({
      data: {
        name: name || null,
        phoneNumber: number,
        countryCode: "+91",
      },
    });

    return res.json(contact);
  } catch (error) {
    // duplicate number error
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Number already exists 👀" });
    }

    console.error(error);
    return res.status(500).json({ error: "failed to add contact" });
  }
};

// 👉 DELETE CONTACT
export const deleteContact = async (req, res) => {
  try {
    
    console.log("delete request params:", req.params); 
   const id = req.params.id


    if (!id) {
      return res.status(400).json({ error: "invalid id" });
    }

    await prisma.contact.delete({
      where: { id },
    });

    return res.json({ message: "Deleted" });
  } catch (error) {
    console.log(error);

    // record not found
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Contact not found" });
    }

    return res.status(500).json({ error: "Failed to delete" });
  }
};






// 👉 ADD BULK CONTACTS
export const addBulkContacts = async (req, res) => {
  try {
    const { contacts } = req.body;

    if (!contacts || !Array.isArray(contacts)) {
      return res.status(400).json({ error: "contacts must be an array" });
    }

    const formattedContacts = contacts.map((phone) => ({
      phoneNumber: phone,
      countryCode: "+91",
    }));

    await prisma.contact.createMany({
      data: formattedContacts,
      skipDuplicates: true,
    });

    return res.json({
      message: "Contacts added successfully",
      count: formattedContacts.length,
    });

  } catch (error) {
    console.error("Add bulk error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

import express from "express";
import {
  getContacts,
  addContact,
  addBulkContacts,
  deleteContact,
} from "../controllers/contactController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getContacts);
router.post("/", auth, addContact);
router.post("/add-bulk", auth, addBulkContacts);
router.delete("/:id", auth, deleteContact);

export default router;

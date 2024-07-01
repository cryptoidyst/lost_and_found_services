import express from "express";
import { createContact, deleteContact, getContact, getContacts, getContactsUsers, updateContact } from "../controllers/contactController";

const router = express.Router();

router.get("/contacts", getContacts);
router.get("/contact-users", getContactsUsers);
router.get("/contact/:id", getContact);
router.post("/contact", createContact);
router.delete("/contact/:id", deleteContact);
router.put("/contact/:id", updateContact);


export default router;

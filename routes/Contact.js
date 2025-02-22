import express from "express";
import {
  addNewContact,
  deleteContact,
  getAllContacts,
  getContactById,
  getContactByUserId,
  updateContactById,
} from "../Models/controllers/Contact.js";
const router = express.Router();
import { Authenticate } from "../Models/Middleware/Auth.js";

// get all contact
router.get(`/`, getAllContacts);
//get contact by id
router.get("/:id", getContactById);
// add Contact
router.post("/add", Authenticate, addNewContact);
// update contact
router.put("/:id", updateContactById);
// delete contact
router.delete(`/:id`, Authenticate, deleteContact);

//contact bu user Id

router.get("/userId/:id", Authenticate, getContactByUserId);

export default router;

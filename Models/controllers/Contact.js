import { Contact } from "../../Models/Contact.js";

// get all contacts
export const getAllContacts = async (req, res) => {
  const userContact = await Contact.find();
  if (!userContact)
    return res.status(404).json({ message: "No Contact found", userContact });
  res.json({ message: "Contact fetched Successfully", userContact });
};

// get specific Contact

export const getContactById = async (req, res) => {
  const id = req.params.id;
  const userContact = await Contact.findById(id);
  if (!userContact)
    return res.status(404).json({ message: "No Contact found", userContact });
  res.json({ message: "Contact fetched: ", userContact });
};

// add new contact

export const addNewContact = async (req, res) => {
  const { name, email, phone, type } = req.body;
  if (name == " " || email == " " || phone == " " || type == " ")
    return res.status(400).json({ message: "All fields are required" });

  const saveContact = await Contact.create({
    name,
    email,
    phone,
    type,
    user: req.user,
  });

  res.json({ message: "contact saved successfully", saveContact });
};
// Update contact

export const updateContactById = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;
  const updateContact = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      type,
    },
    { new: true }
  );
  if (!updateContact)
    return res.status(404).json({ message: "No new Contact found" });
  res.json({ message: "Contact Updated Successfully", updateContact });
};

// delete Constact

export const deleteContact = async (req, res) => {
  const id = req.params.id;
  const deleteContact = await Contact.findByIdAndDelete(id);

  if (!deleteContact)
    return res.status(404).json({ message: "Contact does not exist" });
  res.json({ message: "Contact deleted successfully" });
};

// get contact by userId

export const getContactByUserId = async (req, res) => {
  const id = req.params.id;
  let contact = await Contact.find({ user: id });

  if (!contact) return res.status(404).json({ message: "contact not found" });

  res.json({ message: "User specific contact" });
};

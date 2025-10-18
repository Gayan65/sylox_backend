import mongoose from "mongoose";
import { ContactForm } from "../models/ContactFormModel.js";

export const createContact = async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        const contact = await ContactForm.create({
            name,
            email,
            phone,
            message,
        });
        res.status(200).json(contact);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

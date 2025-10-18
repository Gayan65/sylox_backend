import express from "express";
import { createContact } from "../controllers/contact_form.js";

const router = express.Router();

//contact form
router.post("/create-contact", createContact);

export default router;

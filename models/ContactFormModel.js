import mongoose from "mongoose";

const { Schema } = mongoose;

const contactFormSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        message: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

export const ContactForm = mongoose.model("ContactForm", contactFormSchema);

import nodemailer from "nodemailer";

export const sendMail = async (emailId, nameId) => {
    const htmlMessages = {
        en: `
                <p>Dear <b>${nameId}</b>,</p>
                <p>Thank you for providing your details. We have received your information and will be in touch with you soon.</p>
                <p>Best regards,<br/>Sylox Team</p>
            `,
        fi: `
                <p>Hyvä <b>${nameId}</b>,</p>
                <p>Kiitos, että annoit tietosi. Olemme vastaanottaneet tiedot ja otamme sinuun pian yhteyttä.</p>
                <p>Ystävällisin terveisin,<br/>Sylox-tiimi</p>
            `,
    };

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "gayan.sylox.solutions@gmail.com",
                pass: process.env.EMAIL_PASS,
            },
        });

        // Wrap in an async IIFE so we can use await.

        const info = await transporter.sendMail({
            from: '"Sylox" <gayan.sylox.solutions@gmail.com>',
            to: emailId,
            subject: "Hello ✔",
            html: htmlMessages.en + "<hr/>" + htmlMessages.fi, // HTML body
        });

        console.log("Message sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error.message);
        // Don’t throw — just return error info so the app keeps running
        return null;
    }
};

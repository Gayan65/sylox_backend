import nodemailer from "nodemailer";

export const sendMail = async (emailId, nameId, phoneNumber, userMessage) => {
    const htmlMessages = {
        en: `
        <p>Dear <b>${nameId}</b>,</p>
        <p>Thank you for providing your details. We have received your information and will be in touch with you soon.</p>
        <p>If your matter is urgent, please call us at <a href="tel:+358414702987">+358 41 470 2987</a> or email us at <a href="mailto:info@sylox.fi">info@sylox.fi</a>.</p>
        <p>Best regards,<br/>Sylox Team</p>
    `,
        fi: `
        <p>Hyvä <b>${nameId}</b>,</p>
        <p>Kiitos, että annoit tietosi. Olemme vastaanottaneet tiedot ja otamme sinuun pian yhteyttä.</p>
        <p>Mikäli asiasi on kiireellinen, soita meille numeroon <a href="tel:+358414702987">+358 41 470 2987</a> tai lähetä sähköpostia osoitteeseen <a href="mailto:info@sylox.fi">info@sylox.fi</a>.</p>
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

        // 1️⃣ Email to the user (confirmation)
        await transporter.sendMail({
            from: '"Sylox Solutions" <gayan.sylox.solutions@gmail.com>',
            to: emailId,
            subject: "Viesti vastaanotettu /Message received ",
            html: htmlMessages.fi + "<hr/>" + htmlMessages.en,
        });

        // 2️⃣ Email to yourself (includes extra info)
        const adminMessage = `
            <p><b>New contact form submission:</b></p>
            <p><b>Name:</b> ${nameId}</p>
            <p><b>Email:</b> ${emailId}</p>
            <p><b>Phone:</b> ${phoneNumber || "N/A"}</p>
            <p><b>Message:</b><br/>${userMessage || "(No message provided)"}</p>
        `;

        const info = await transporter.sendMail({
            from: '"Sylox Website" <gayan.sylox.solutions@gmail.com>',
            to: "gayan.sylox.solutions@gmail.com",
            subject: `New Contact Submission from ${nameId}`,
            html: adminMessage,
        });

        console.log("Message sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error.message);
        return null;
    }
};

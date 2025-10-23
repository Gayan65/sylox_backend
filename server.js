import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import contactRouter from "./routes/contact_form.js";

const app = express();
const port = process.env.PORT;
const db_url = process.env.DB_URL;

app.use(
    cors({
        origin: ["http://localhost:3000", "http://13.60.197.98:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Middleware to parse JSON body
app.use(express.json());

app.use("/api/contact", contactRouter);

mongoose
    .connect(db_url)
    .then(() => {
        //server
        app.listen(port, () => {
            console.log(`Sylox backend runs on port ${port}`);
        });
    })
    .catch((err) => console.log(err));

import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import contactRouter from "./routes/contact_form.js";

const app = express();
const port = process.env.PORT;
const db_url = process.env.DB_URL;

// Middleware to parse JSON body
app.use(express.json());

app.use("/contact", contactRouter);

mongoose
    .connect(db_url)
    .then(() => {
        //server
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    })
    .catch((err) => console.log(err));

import express from "express";
import cocktailsRouter from "./routes/cocktails";
import usersRouter from "./routes/users";
import mongoose from "mongoose";
import config from "./config";
import mongoDb from "./mongoDb";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/cocktails', cocktailsRouter);
app.use('/users', usersRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
       mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));



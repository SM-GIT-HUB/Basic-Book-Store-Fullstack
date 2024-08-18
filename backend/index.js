import express from "express"
import mongoose from "mongoose"
import booksRoute from './routes/booksRoutes.js'
import cors from "cors"
import "dotenv/config"

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send("<h1>Hey there</h1>");
})

app.use('/books', booksRoute);

mongoose.connect("mongodb://127.0.0.1:27017/dbb")
.then(() => {
    console.log("Connection successful");

    app.listen(process.env.PORT, () => {
        console.log(`listening ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log(err);
})
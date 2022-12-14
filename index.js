import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Posting from './Routes/Posting.Route';
import fileUpload from 'express-fileupload';

const app = express();
dotenv.config();

app.use(express.static("public"));
app.use(express.json());

app.use(fileUpload()); 
app.use(cors());

app.use(Posting)

app.listen(process.env.PORT, () => {
    console.log(`this server lisstening at http://localhost:${process.env.PORT}`);
})
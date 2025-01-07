import express, { json } from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import cors from 'cors'
import { router } from "./router/authRoute.js";
import cookieParser from "cookie-parser";
import { router as paymentRouter } from "./router/paymentRoute.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

dotenv.config();

const PORT = process.env.PORT || 5000
const URI = process.env.URI
const corsConfig = { origin: 'http://localhost:3000', credentials: true,}

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

app.use(cookieParser());
app.use(json());

app.use('/', router);
app.use('/payment', paymentRouter)

app.listen(PORT, connectDB(), () => console.log(`App running on port: ${PORT}`));
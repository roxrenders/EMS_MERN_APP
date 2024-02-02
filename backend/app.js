import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
// Correct import path
// Correct file extension
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import deptRoutes from './routes/deptRoutes.js';

// configuration

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', deptRoutes)

mongoose.connect(process.env.DATABASE)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 8000;


app.listen(port, () => {
    console.log(`Server Running On Port ${port}`);
});


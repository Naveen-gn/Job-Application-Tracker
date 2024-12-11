import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import jobsRoutes from './routes/job.route.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.error(err));

const app = express();

var corsOptions = {
  origin: 'https://track-myjob.vercel.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

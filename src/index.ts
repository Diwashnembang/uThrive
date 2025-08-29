import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {serviceProviderRouter , userRouter, adminRouter }from './routes/routes';
import { loggerMiddleware } from './middleware/middleware';

dotenv.config()
const app = express()
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(loggerMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.use("/api/serviceProvider/", serviceProviderRouter);
app.use("/api/user/", userRouter);
app.use("/api/admin/", adminRouter);
app.listen(8000 , () => {
  console.log('Server is running on port 8000')
})
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {serviceProviderRouter , userRouter, adminRouter }from './routes/routes';
import { loggerMiddleware } from './middleware/middleware';

dotenv.config()
const app = express()
app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000",
  "https://u-thrive-frontend.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
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
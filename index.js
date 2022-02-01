import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { errorHandler } from './src/middleware/ErrorHandler.js';

dotenv.config();

const { MONGO_URI, PORT } = process.env;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('listening on port ', PORT);
    app.listen(PORT);
  })
  .catch((err) => console.log(err));

export { app };

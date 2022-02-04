import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { errorHandler } from './middleware/ErrorHandler.js';
import { router } from './routes/index.js';

dotenv.config();

const { MONGO_URI, PORT } = process.env;

const app = express();

//Enable cors
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);

app.use('/api', router);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('listening on port : ', PORT);
    app.listen(PORT);
  })
  .catch((err) => console.log(err));

export { app };

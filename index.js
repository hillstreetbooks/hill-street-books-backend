const path = require('path');

const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

dotenv.config();

const { MONGO_URI, PORT } = process.env;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('listening on port ', PORT);
    app.listen(PORT);
  })
  .catch((err) => console.log(err));

module.exports = app;

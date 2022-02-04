import dotenv from 'dotenv';

import nodemailer from 'nodemailer';

dotenv.config();

const { EMAIL_TYPE, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

/**
 * Creates a Transport to send emails
 */
const transporter = nodemailer.createTransport({
  service: EMAIL_TYPE,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD
  }
});

export { transporter };

import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { EMAIL_CONTENT } from '../constants/constants.js';

dotenv.config();

const { EMAIL_TYPE, EMAIL_USERNAME, EMAIL_PASSWORD, SERVER_URL, PORT } =
  process.env;

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

/**
 * Verify if the Transporter is configured properly
 * @returns Result of Verification
 */
const verifyTransporter = () => {
  transporter.verify((error, success) => {
    if (error) console.log(error);
    else console.log('Transporter configured successfully.');
    return success;
  });
};

/**
 * Configure Mail Options
 * @param type
 * @param username
 * @param serverUrl
 * @param URL
 * @returns mailOptions
 */
const configureMailOptions = (type, username, serverUrl, URL) => {
  serverUrl = serverUrl || SERVER_URL + PORT;
  const emailContent = EMAIL_CONTENT[type] || EMAIL_CONTENT.DEFAULT;
  return {
    from: EMAIL_USERNAME,
    to: username,
    subject: emailContent.SUBJECT,
    html: emailContent.BODY.replace(/%\w+%/g, serverUrl + URL)
  };
};

export { configureMailOptions, transporter, verifyTransporter };

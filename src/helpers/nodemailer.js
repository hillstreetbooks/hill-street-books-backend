import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

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
 * @param username
 * @param emailSubject
 * @param emailBody
 * @returns mailOptions
 */
const configureMailOptions = (username, emailSubject, emailBody) => {
  return {
    from: EMAIL_USERNAME,
    to: username,
    subject: emailSubject,
    html: emailBody
  };
};

export { configureMailOptions, transporter, verifyTransporter };

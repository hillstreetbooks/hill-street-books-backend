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
 * @param _id
 * @param username
 * @param uniqueString
 * @returns mailOptions
 */
const configureMailOptions = (_id, username, uniqueString) => {
  const serverUrl = SERVER_URL + PORT;
  return {
    from: EMAIL_USERNAME,
    to: username,
    subject: 'Please verify your email to activate your account!',
    html: `<p>Please verify your email to activate your account.</p>
        <p>This link will expre in <b>1 hour</b>.</p>
        <p>Click <a href=${serverUrl}/api/author/verify/${_id}/${uniqueString}>here</a> to activate.</p>`
  };
};

export { configureMailOptions, transporter, verifyTransporter };

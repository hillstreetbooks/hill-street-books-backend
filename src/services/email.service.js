import { AuthorVerification } from '../models/AuthorVerification.js';
import {
  configureMailOptions,
  transporter,
  verifyTransporter
} from '../helpers/nodemailer.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { EMAIL_CONTENT } from '../constants/constants.js';

dotenv.config();

/** @module EmailService */
export class EmailService {
  constructor() {
    this.SERVER_URL = process?.env?.SERVER_URL || 'http://localhost:4000';
  }

  /**
   * @function sendVerificationEmail
   * @description This method sends a verification email for the author to verify
   * @param {string} _id The Author's unique ID in the database
   * @param {string} username The Author's EmailID
   * @param {string} type The type of email to be sent
   * @param {string} url Link
   * @returns {String} Returns a message
   */
  sendVerificationEmail = async (_id, username, type, url, serverUrl) => {
    const uniqueString = uuidv4() + _id;

    const emailContent = EMAIL_CONTENT[type] || EMAIL_CONTENT.DEFAULT;

    serverUrl = serverUrl || this.SERVER_URL;

    //Mailer Options
    const mailOptions = configureMailOptions(
      username,
      emailContent.SUBJECT,
      emailContent.BODY.replace(
        /%\w+%/g,
        serverUrl + `${url}/${_id}/${uniqueString}`
      )
    );

    //Hash the uniqueString
    const saltRounds = 10;
    try {
      const authorVerification = await AuthorVerification.findOne({
        userId: _id
      });
      if (authorVerification) {
        await AuthorVerification.deleteOne({
          userId: _id
        });
      }
      const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds);

      //Set values to AuthorVerification collection
      const newVerification = new AuthorVerification({
        userId: _id,
        uniqueString: hashedUniqueString,
        createAt: Date.now(),
        expiresAt: Date.now() + 3600000
      });

      //Set AuthorVerification collection
      return newVerification
        .save()
        .then(() => {
          if (verifyTransporter()) console.log('before sending email');
          //Send Email
          return transporter
            .sendMail(mailOptions)
            .then(() => {
              return `A Verification email has been sent to the registered Email ID!`;
            })
            .catch((error) => {
              console.log(error);
              return `Couldn't send verification email to the registered Email ID!`;
            });
        })
        .catch((error) => {
          console.log(error);
          return `Couldn't save verification data!`;
        });
    } catch (error) {
      return 'An error occurred while hashing email data!';
    }
  };

  /**
   * @function sendEmail
   * @description This method sends an email to the author
   * @param {string} username The Author's EmailID
   * @param {string} name The Author's Name
   * @param {string} status The Admin's action
   * @param {string} message The Admin's message
   * @returns {String} Returns a message
   */
  sendEmail = async (username, name, status, message) => {
    //Mailer Options
    const mailOptions = configureMailOptions(
      username,
      `Hill Street Books - Author Page : ${status}`,
      `<p>Hi ${name},</p>
      <p>Your Hill Street Books Content Page has been ${status} by the Admin.</p>
      <br/>
      <p>The below message is from the admin,</p>
      <p>'${message}'</p><br/><br/><br/>
      <p>Thanks & Regards,<p>
      <p>Hill Street Books Team<p>`
    );

    if (verifyTransporter()) console.log('before sending email');
    //Send Email
    return transporter
      .sendMail(mailOptions)
      .then(() => {
        return `${name}'s content page has been ${status} successfully.`;
      })
      .catch((error) => {
        console.log(error);
        return `Couldn't send verification email to the registered Email ID!`;
      });
  };
}

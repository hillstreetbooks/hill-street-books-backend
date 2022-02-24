import { AuthorVerification } from '../models/AuthorVerification.js';
import {
  configureMailOptions,
  transporter,
  verifyTransporter
} from '../helpers/nodemailer.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

/** @module EmailService */
export class EmailService {
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

    //Mailer Options
    const mailOptions = configureMailOptions(
      type,
      username,
      serverUrl,
      `${url}/${_id}/${uniqueString}`
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
}

import { AuthorVerification } from '../models/AuthorVerification.js';
import {
  configureMailOptions,
  transporter,
  verifyTransporter
} from '../helpers/nodemailer.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export class EmailService {
  /**
   * Sends a verification email for the author to verify
   * @param user_details
   * @returns Message
   */
  sendVerificationEmail = async ({ _id, username }) => {
    const uniqueString = uuidv4() + _id;

    //Mailer Options
    const mailOptions = configureMailOptions(_id, username, uniqueString);

    //Hash the uniqueString
    const saltRounds = 10;
    try {
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
              return `Verification email sent to the registered Email ID!`;
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

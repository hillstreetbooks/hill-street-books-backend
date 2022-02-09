import { Author } from '../models/Author.js';
import * as EmailValidator from 'email-validator';
import { EmailService } from './email.service.js';
import { AuthorVerification } from '../models/AuthorVerification.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export class AuthorService {
  constructor() {
    this.emailServiceInstance = new EmailService();
  }
  /**
   * Inserts the author in to the database
   * @param user_details
   * @returns Message
   */
  registerAuthor = async ({ username, password, name }) => {
    if (EmailValidator.validate(username) && password && name) {
      try {
        const author = await Author.findOne({ username });
        if (author) {
          return 'An author has already registered with this email!';
        } else {
          //Encrypt author password
          var encryptedPassword = await bcrypt.hash(password, 10);
          const author = await Author.create({
            username,
            password: encryptedPassword,
            name,
            verified: false
          });
          await author.save();
          const verificationEmail =
            await this.emailServiceInstance.sendVerificationEmail(author);
          return verificationEmail;
        }
      } catch (err) {
        console.log(err);
        return 'Oops! Something went wrong. Could not register author.';
      }
    } else {
      return 'All fields are mandatory!';
    }
  };

  /**
   * Verify Author Email
   * @param user_verification_details
   * @returns Message
   */
  verifyAuthorEmail = async ({ userId, uniqueString }) => {
    try {
      const author = await AuthorVerification.findOne({ userId });
      if (author) {
        console.log(author);
        const { expiresAt } = author;
        const hashedUniqueString = author.uniqueString;
        if (expiresAt < Date.now()) {
          const deleteAuthorVerification = await AuthorVerification.deleteOne({
            userId
          });
          if (deleteAuthorVerification) {
            const deleteAuthor = await Author.deleteOne({
              _id: userId
            });
            if (deleteAuthor) {
              return 'Link has expired. Please sign up again.';
            } else {
              return 'Something went wrong while deleting the author.';
            }
          } else {
            return 'Something went wrong while deleting the AuthorVerification record.';
          }
        } else {
          try {
            const uniqueStringValidation = await bcrypt.compare(
              uniqueString,
              hashedUniqueString
            );
            if (uniqueStringValidation) {
              try {
                const updatedAuthor = await Author.updateOne(
                  { _id: userId },
                  { verified: true }
                );
                if (updatedAuthor) {
                  try {
                    await AuthorVerification.deleteOne({
                      userId
                    });
                    return 'Your email has been verified successfully. Please login to access your account.';
                  } catch (error) {
                    console.log(error);
                    return 'An error occurred while finalizing email verification.';
                  }
                }
              } catch (error) {
                console.log(error);
                return 'An error occurred while updating the Author to verified status.';
              }
            } else {
              return 'The unique string is invalid. Please sign up again!';
            }
          } catch (error) {
            console.log(error);
            return 'An error occurred while comparing unique string.';
          }
        }
      } else {
        return `Your email couldn't be verified because the associated account was not found in our database.`;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  /**
   * Inserts the author in to the database
   * @param user_details
   * @returns Message
   */
   authenticateUser = async ({ username, password, remainLoggedIn}) => {   
    if (EmailValidator.validate(username) && password ){
      // Validate if author exist in database
      const author = await Author.findOne({
        username,
      });
      if (author && (await bcrypt.compare(password, author.password))) {
        // Create token

        const token = remainLoggedIn ? jwt.sign(
          { user_id: author._id, username },
          process.env.TOKEN_KEY
        ) : jwt.sign(
          { user_id: author._id, username },
          process.env.TOKEN_KEY,
          {
            expiresIn: "1h",
          }
        );
  
        // save author token
        author.token = token;
        await author.save();
  
        // user
        return { username, token };
      } else {
        return "Invalid Credentials";
      }
    } else {
      return "All fields are mandatory!";
    }
  };

  fetchAuthorInfo = async ({username}) => {   
    if (username) {
      // Validate if author exist in database
      const author = await Author.findOne({
        username,
      });
      if (author) {
        let { name } = author;
        return { username, name };
      } else {
        return { errorMsg: "Username not found!" };
      }
    } else {
      return{ errorMsg: "Username is mandatory!" };
    }
  };

}

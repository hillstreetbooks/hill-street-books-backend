import { Author } from '../models/Author.js';
import { EmailService } from './email.service.js';
import { AuthorVerification } from '../models/AuthorVerification.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/** @module AuthorService */
export class AuthorService {
  constructor() {
    this.emailServiceInstance = new EmailService();
  }
  /**
   * @function registerAuthor
   * @description This method inserts the author's details as a record in the database
   * @param {string} username The Author's EmailID
   * @param {string} password The Author's Password
   * @param {string} name The Author's Name
   * @returns {string} Returns a message
   */
  registerAuthor = async (username, password, name) => {
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
          await this.emailServiceInstance.sendVerificationEmail(
            author._id,
            username,
            'VERIFY_EMAIL',
            '/api/author/verify'
          );
        return verificationEmail;
      }
    } catch (err) {
      console.log(err);
      return 'Oops! Something went wrong. Could not register author.';
    }
  };

  /**
   * Verify Author's Email
   * @param {string} userId
   * @param {string} uniqueString
   * @returns {string} Message
   */
  verifyAuthorEmail = async (userId, uniqueString) => {
    try {
      const author = await AuthorVerification.findOne({ userId });
      if (author) {
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
   * @function authenticateUser
   * @description This method validates the author's credentials
   * @param {string} username The Author's EmailID
   * @param {string} password The Author's Password
   * @param {boolean} remainLoggedIn Remain Logged In
   * @returns {string} Returns a message
   */
  authenticateUser = async (username, password, remainLoggedIn) => {
    // Validate if author exist in database
    const author = await Author.findOne({
      username
    });
    if (author) {
      if (author.verified) {
        if (await bcrypt.compare(password, author.password)) {
          // Create token
          const token = remainLoggedIn
            ? jwt.sign({ user_id: author._id, username }, process.env.TOKEN_KEY)
            : jwt.sign(
                { user_id: author._id, username },
                process.env.TOKEN_KEY,
                {
                  expiresIn: '2h'
                }
              );

          // save author token
          author.token = token;
          await author.save();

          // Fetch Author ID
          const { _id, name } = author;

          return { _id, name, username, token };
        } else {
          return 'Sorry, your password is incorrect. Please try again with the correct password or use the forgot password option to reset your password.';
        }
      } else {
        return 'Please verify your email by clicking the link in the verification email sent to your registered EmailID.';
      }
    } else {
      return `Username not found!`;
    }
  };

  /**
   * @function fetchAuthorInfo
   * @description This method fetches the Author's Info
   * @param {string} username The Author's EmailID
   * @returns {object} Returns an object which has author's details
   */
  fetchAuthorInfo = async (username) => {
    // Validate if author exist in database
    const author = await Author.findOne({
      username
    });
    if (author) {
      let { name } = author;
      return { username, name, password };
    } else {
      return 'Username not found!';
    }
  };

  /**
   * @function retrievePassword
   * @description This method validates the author's email and sends a retrieve password link
   * @param {string} username The Author's EmailID
   * @param {string} REACT_BASE_URL Frontend Base URL
   * @returns {String} Returns a message
   */
  retrievePassword = async (username, REACT_BASE_URL) => {
    // Validate if author exist in database
    const author = await Author.findOne({
      username
    });
    if (author) {
      const verificationEmail =
        await this.emailServiceInstance.sendVerificationEmail(
          author._id,
          username,
          'PASSWORD_RESET',
          '/password-reset',
          REACT_BASE_URL
        );
      return verificationEmail;
    } else {
      return 'Username not found!';
    }
  };

  /**
   * @function resetPassword
   * @description This method resets the Author's Password
   * @param {string} userId The Author's unique ID in the database
   * @param {string} uniqueString Unique generated String
   * @param {string} password The Author's Password
   * @returns {String} Returns a message
   */
  resetPassword = async (userId, uniqueString, password) => {
    // Validate if author exist in database
    try {
      const author = await AuthorVerification.findOne({ userId });
      if (author) {
        const { expiresAt } = author;
        const hashedUniqueString = author.uniqueString;
        if (expiresAt < Date.now()) {
          const deleteAuthorVerification = await AuthorVerification.deleteOne({
            userId
          });
          if (deleteAuthorVerification) {
            return 'Link has expired. Please try again.';
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
                //Encrypt author password
                var encryptedPassword = await bcrypt.hash(password, 10);
                const updatedAuthor = await Author.updateOne(
                  { _id: userId },
                  { password: encryptedPassword }
                );
                if (updatedAuthor) {
                  try {
                    await AuthorVerification.deleteOne({
                      userId
                    });
                    return 'Your password has been reset successfully. Please sign in to access your account.';
                  } catch (error) {
                    console.log(error);
                    return 'An error occurred while resetting your password.';
                  }
                }
              } catch (error) {
                console.log(error);
                return 'An error occurred while resetting your password.';
              }
            } else {
              return 'The unique string is invalid. Please try again!';
            }
          } catch (error) {
            console.log(error);
            return 'An error occurred while comparing unique string.';
          }
        }
      } else {
        return `Your password couldn't be reset because the associated account was not found in our database.`;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

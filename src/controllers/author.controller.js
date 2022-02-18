import { AuthorService } from '../services/author.service.js';
import dotenv from 'dotenv';

dotenv.config();

const REACT_BASE_URL = 'http://localhost:3000';
export class AuthorController {
  constructor() {
    this.REACT_BASE_URL =
      process?.env?.REACT_SERVER_URL || 'http://localhost:3000';
    this.service = new AuthorService();
  }

  /**
   * Insert Author details to DB
   */
  registerAuthor = async (req, res) => {
    try {
      const { username, password, name } = req.body;
      const response = await this.service.registerAuthor(
        username,
        password,
        name
      );
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };

  /**
   * Verify Author's Email ID
   */
  verifyAuthorEmail = async (req, res) => {
    try {
      const { userId, uniqueString } = req.params;
      const response = await this.service.verifyAuthorEmail(
        userId,
        uniqueString
      );
      return res.redirect(
        `${this.REACT_BASE_URL}/registration?message=${response}`
      );
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };

  /**
   * Authenticate User Credentials
   */
  authenticateUser = async (req, res) => {
    try {
      const { username, password, remainLoggedIn } = req.body;
      const response = await this.service.authenticateUser(
        username,
        password,
        remainLoggedIn
      );
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };

  /**
   * Fetch Author's Info
   */
  fetchAuthorInfo = async (req, res) => {
    try {
      const { username } = req.query;
      const response = await this.service.fetchAuthorInfo(username);
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };

  /**
   * Send Retrieve Password link
   */
  retrievePassword = async (req, res) => {
    try {
      const { username } = req.body;
      const response = await this.service.retrievePassword(
        username,
        REACT_BASE_URL
      );
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };

  /**
   * Reset Author's Password
   */
  resetPassword = async (req, res) => {
    try {
      const { userId, uniqueString, password } = req.body;
      const response = await this.service.resetPassword(
        userId,
        uniqueString,
        password
      );
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };
}

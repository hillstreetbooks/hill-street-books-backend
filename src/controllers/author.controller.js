import { AuthorService } from '../services/author.service.js';
import dotenv from 'dotenv';

dotenv.config();

const REACT_BASE_URL = process.env.REACT_SERVER_URL || 'http://localhost:3000';
export class AuthorController {
  constructor() {
    this.service = new AuthorService();
  }

  /**
   * Insert Author details to DB
   */
  registerAuthor = async (req, res) => {
    try {
      const response = await this.service.registerAuthor(req.body.user);
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
      const response = await this.service.verifyAuthorEmail(req.params);
      return res.redirect(`${REACT_BASE_URL}/registration?message=${response}`);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };

  authenticateUser = async (req, res) => {
    try {
      const response = await this.service.authenticateUser(req.body.user);
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };

  

}

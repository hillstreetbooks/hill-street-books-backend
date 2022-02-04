import { AuthorService } from '../services/author.service.js';

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
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };
}

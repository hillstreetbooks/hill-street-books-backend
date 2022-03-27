import { AuthorContentService } from '../services/authorcontent.service.js';

/** @module AuthorContentController */
export class AuthorContentController {
  constructor() {
    this.service = new AuthorContentService();
  }

  /**
   * @function updateContent
   * @description This method updates the author's content in the database
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {String} Returns a message
   */
  updateContent = async (req, res) => {
    try {
      const response = await this.service.updateContent(req);
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };

  /**
   * @function fetchContent
   * @description This method fetches the author's content from the database
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {AuthorContent} Returns an Object (AuthorContent)
   */
  fetchContent = async (req, res) => {
    try {
      const { username } = req.body;
      const response = await this.service.fetchContent(username);
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };
}

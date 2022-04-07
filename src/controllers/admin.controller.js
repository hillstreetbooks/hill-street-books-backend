import { AdminService } from '../services/admin.service.js';
import dotenv from 'dotenv';

dotenv.config();

/** @module AdminController */
export class AdminController {
  constructor() {
    this.service = new AdminService();
  }

  /**
   * @function fetchAuthors
   * @description This method fetches all the authors registered in the system
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {Array} Returns an array of Authors
   */
  fetchAuthors = async (req, res) => {
    try {
      const response = await this.service.fetchAuthors();
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };

  /**
   * @function removeAuthorContent
   * @description This method removes the author content
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {String} Returns a message
   */
  removeAuthorContent = async (req, res) => {
    try {
      const { _id, message } = req.body;
      const response = await this.service.removeAuthorContent(
        _id,
        message.value
      );
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };
}

import { AuthorService } from '../services/author.service.js';
import dotenv from 'dotenv';

dotenv.config();

/** @module AuthorController */
export class AuthorController {
  constructor() {
    this.REACT_BASE_URL =
      process?.env?.REACT_SERVER_URL || 'http://localhost:3000';
    this.service = new AuthorService();
  }

  /**
   * @function registerAuthor
   * @description This method inserts the author's details as a record in the database
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {object} Returns a response object
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
   * @function verifyAuthorEmail
   * @description This method verifies the Author's Email
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {object} Redirects to the registration page
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
   * @function authenticateUser
   * @description This method validates the author's credentials
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {object} Returns a response object
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
   * @function fetchAuthorInfo
   * @description This method fetches the Author's Info
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {object} Returns a response object
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
   * @function retrievePassword
   * @description This method validates the author's email and sends a retrieve password link
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {object} Returns a response object
   */
  retrievePassword = async (req, res) => {
    try {
      const { username } = req.body;
      const response = await this.service.retrievePassword(
        username,
        this.REACT_BASE_URL
      );
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };

  /**
   * @function resetPassword
   * @description This method resets the Author's Password
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {object} Returns a response object
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

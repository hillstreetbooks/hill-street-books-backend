import { AdminService } from '../services/admin.service.js';
import { NotificationService } from '../services/notification.service.js';
import dotenv from 'dotenv';

dotenv.config();

/** @module AdminController */
export class AdminController {
  constructor() {
    this.service = new AdminService();
    this.notificationServiceInstance = new NotificationService();
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
   * @function publishAuthorContent
   * @description This method publishes the author content
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {String} Returns a message
   */
  publishAuthorContent = async (req, res) => {
    try {
      const { _id, message } = req.body;
      const response = await this.service.publishAuthorContent(
        _id,
        message.value
      );
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };

  /**
   * @function unpublishAuthorContent
   * @description This method unpublishes the author content
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {String} Returns a message
   */
  unpublishAuthorContent = async (req, res) => {
    try {
      const { _id, message } = req.body;
      const response = await this.service.unpublishAuthorContent(
        _id,
        message.value
      );
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

  /**
   * @function removeNotification
   * @description This method removes the notification once it is viewed by the admin
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {String} Returns a message
   */
  removeNotification = async (req, res) => {
    try {
      const { username } = req.body;
      const response =
        await this.notificationServiceInstance.removeAdminNotification(
          username
        );
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };

  /**
   * @function fetchAdminNotifications
   * @description This method removes the notification once it is viewed by the admin
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {Array} Returns an array of notifications
   */
  fetchAdminNotifications = async (req, res) => {
    try {
      const response =
        await this.notificationServiceInstance.fetchAdminNotifications();
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };
}

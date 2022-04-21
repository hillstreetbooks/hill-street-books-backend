import { Author } from '../models/Author.js';
import { Notification } from '../models/Notifications.js';
import moment from 'moment';

/** @module NotificationService */
export class NotificationService {
  /**
   * @function sendAdminNotification
   * @description This method send a notification to the admin
   * @param {string} username The Author's EmailID
   * @returns {string} Returns a message
   */
  sendAdminNotification = async (username) => {
    try {
      let author = await Author.findOne({ username });
      if (author) {
        let notification = await Notification.findOne({ username });
        if (notification) {
          notification.lastUpdatedAt = moment().format('DD-MM-YYYY HH:mm:ss');
          await notification.save();
        } else {
          Notification.create({
            userId: author._id,
            username,
            name: author.name,
            lastUpdatedAt: moment().format('DD-MM-YYYY HH:mm:ss'),
            isViewed: false
          });
        }
      }
      return 'Notification sent to admin!';
    } catch (err) {
      console.log(err);
      return 'Oops! Something went wrong. Could not send notification to author.';
    }
  };

  /**
   * @function removeAdminNotification
   * @description This method removes the notification once it is viewed by the admin
   * @param {string} username The Author's Username (Email)
   * @returns {string} Returns a message
   */
  removeAdminNotification = async (username) => {
    try {
      let notification = await Notification.deleteOne({ username });
      if (notification) return await Notification.find();
      else return 'Oops! Something went wrong. Could not remove notification.';
    } catch (err) {
      console.log(err);
      return 'Oops! Something went wrong. Could not remove notification.';
    }
  };

  /**
   * @function fetchAdminNotifications
   * @description This method removes the notification once it is viewed by the admin
   * @returns {Array} Returns an array of notifications
   */
  fetchAdminNotifications = async () => {
    try {
      let notifications = await Notification.find();
      return notifications;
    } catch (err) {
      console.log(err);
      return 'Oops! Something went wrong. Could not fetch notifications.';
    }
  };
}

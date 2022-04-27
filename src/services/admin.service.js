import { Author } from '../models/Author.js';
import { AuthorContent } from '../models/AuthorContent.js';
import { EmailService } from './email.service.js';
import { ObjectId } from 'mongodb';

/** @module AdminService */
export class AdminService {
  constructor() {
    this.emailServiceInstance = new EmailService();
  }

  /**
   * @function fetchAuthors
   * @description This method fetches all the authors registered in the system
   * @returns {Array} Returns an array of Authors
   */
  fetchAuthors = async () => {
    try {
      return Author.find({}, { password: 0, token: 0 }).then(
        async (authors) => {
          let optimizedResponse = [];
          for await (const item of authors) {
            const authorContent = await AuthorContent.findOne({
              username: item.username
            });
            if (authorContent) {
              optimizedResponse.push({
                _id: item._id,
                username: item.username,
                name: item.name,
                verified: item.verified,
                lastUpdated: authorContent.lastUpdated,
                isPublished: authorContent.isPublished,
                hasAuthorContent: true
              });
            } else
              optimizedResponse.push({
                _id: item._id,
                username: item.username,
                name: item.name,
                verified: item.verified,
                hasAuthorContent: false
              });
          }
          return optimizedResponse;
        }
      );
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  };

  /**
   * @function publishAuthorContent
   * @description This method publishes the author content
   * @param {String} _id Author's ID
   * @param {String} message Admin's message to the author
   * @returns {String} Returns a message
   */
  publishAuthorContent = async (_id, message) => {
    try {
      return Author.findOne({ _id: ObjectId(_id) }).then(async (author) => {
        const authorContent = await AuthorContent.findOne({
          username: author.username
        });
        if (authorContent) {
          authorContent.isPublished = true;
          await authorContent.save();
          const emailResponse = await this.emailServiceInstance.sendEmail(
            author.username,
            author.name,
            'Published',
            message
          );
          return emailResponse;
        } else {
          return `${author.name} does not have a content page to publish.`;
        }
      });
    } catch (err) {
      console.log(err);
      return {
        errorMsg: `Oops! Something went wrong. Could not publish author's content!`
      };
    }
  };

  /**
   * @function unpublishAuthorContent
   * @description This method unpublishes the author content
   * @param {String} _id Author's ID
   * @param {String} message Admin's message to the author
   * @returns {String} Returns a message
   */
  unpublishAuthorContent = async (_id, message) => {
    try {
      return Author.findOne({ _id: ObjectId(_id) }).then(async (author) => {
        const authorContent = await AuthorContent.findOne({
          username: author.username
        });
        if (authorContent) {
          authorContent.isPublished = false;
          await authorContent.save();
          const emailResponse = await this.emailServiceInstance.sendEmail(
            author.username,
            author.name,
            'Unpublished',
            message
          );
          return emailResponse;
        } else {
          return `${author.name} does not have a content page to unpublish.`;
        }
      });
    } catch (err) {
      console.log(err);
      return {
        errorMsg: `Oops! Something went wrong. Could not unpublish author's content!`
      };
    }
  };

  /**
   * @function removeAuthorContent
   * @description This method removes the author content
   * @param {String} _id Author's ID
   * @param {String} message Admin's message to the author
   * @returns {String} Returns a message
   */
  removeAuthorContent = async (_id, message) => {
    try {
      return Author.findOne({ _id: ObjectId(_id) }).then(async (author) => {
        const authorContent = await AuthorContent.deleteOne({
          username: author.username
        });
        if (authorContent) {
          const emailResponse = await this.emailServiceInstance.sendEmail(
            author.username,
            author.name,
            'Removed',
            message
          );
          return emailResponse;
        } else {
          return `${author.name} does not have a content page to remove.`;
        }
      });
    } catch (err) {
      console.log(err);
      return {
        errorMsg: `Oops! Something went wrong. Could not unpublish author's content!`
      };
    }
  };
}

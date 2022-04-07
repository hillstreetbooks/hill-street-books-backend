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
}

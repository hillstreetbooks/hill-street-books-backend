import { AuthorContent } from '../models/AuthorContent.js';
import { ImageUploaderService } from './imageuploader.service.js';

/** @module AuthorContentService */
export class AuthorContentService {
  /**
   * @function updateContent
   * @description This method updates the author's content in the database
   * @param {object} req Request Object
   * @returns {String} Returns a message
   */
  updateContent = async (req) => {
    try {
      const { username, author_details, social_links, books, videos } =
        req.body;
      const author = await AuthorContent.findOne({ username });
      if (author) {
        if (
          author_details.display_picture &&
          author_details.display_picture.value !== ''
        ) {
          const uploadResponse = await ImageUploaderService.uploadImage(
            author_details.display_picture.value
          );
          author_details.display_picture.value = uploadResponse.secure_url;
        }
        books.forEach(async (book) => {
          if (book.bookCover && book.bookCover !== '') {
            const uploadResponse = await ImageUploaderService.uploadImage(
              book.bookCover
            );
            book.bookCover = uploadResponse.secure_url;
          }
        });
        author.author_details = author_details;
        author.social_links = social_links;
        author.books = books;
        author.videos = videos;
        await author.save();
      } else {
        if (
          author_details.display_picture &&
          author_details.display_picture.value !== ''
        ) {
          const uploadResponse = await ImageUploaderService.uploadImage(
            author_details.display_picture.value
          );
          author_details.display_picture.value = uploadResponse.secure_url;
        }
        books.forEach(async (book) => {
          if (book.bookCover && book.bookCover !== '') {
            const uploadResponse = await ImageUploaderService.uploadImage(
              book.bookCover
            );
            book.bookCover = uploadResponse.secure_url;
          }
        });
        AuthorContent.create({
          username,
          author_details,
          social_links,
          books,
          videos
        });
      }
      return `Updated author's content`;
    } catch (err) {
      console.log(err);
      return {
        errorMsg: 'Oops! Something went wrong. Could not update content!'
      };
    }
  };

  /**
   * @function fetchContent
   * @description This method fetches the author's content from the database
   * @param {String} username Author's username (email)
   * @returns {AuthorContent} Returns an Object (AuthorContent)
   */
  fetchContent = async (username) => {
    try {
      const author = await AuthorContent.findOne({ username });
      console.log('username : ', username);
      if (author) {
        return author;
      } else {
        return {};
      }
    } catch (err) {
      console.log(err);
      return {
        errorMsg: 'Oops! Something went wrong. Could not update content!'
      };
    }
  };
}

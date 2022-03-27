import { cloudinary } from '../helpers/cloudinary.js';

/** @module ImageUploaderService */
export class ImageUploaderService {
  /**
   * @function uploadImage
   * @description This method uploads the image to cloudinary
   * @param {String} data Image
   * @returns {object} Returns am Object
   */
  static uploadImage = async (data) => {
    try {
      const uploadResponse = await cloudinary.v2.uploader.upload(data, {
        upload_preset: 'dev_setups'
      });
      return uploadResponse;
    } catch (err) {
      console.log(err);
      return {
        errorMsg:
          'Oops! Something went wrong. Could not upload image to cloudinary!'
      };
    }
  };
}

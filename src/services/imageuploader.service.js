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

  /**
   * @function destroyImage
   * @description This method destroys the image if it is present in cloudinary
   * @param {String} data Image
   * @returns {object} Returns am Object
   */
  static destroyImage = async (data) => {
    try {
      console.log('destroy data : ', data);
      const public_id = this.getPublicId(data);
      console.log('public_id : ', public_id);
      const deletedImage = await cloudinary.v2.uploader.destroy(public_id);
      return deletedImage;
    } catch (err) {
      console.log(err);
      return {
        errorMsg:
          'Oops! Something went wrong. Could not destroy the image from cloudinary!'
      };
    }
  };

  static getPublicId = (image_url) => {
    const params = image_url.split('/');
    const file_name = params[params.length - 1].split('.');
    return `${params[params.length - 2]}/${file_name[0]}`;
  };
}

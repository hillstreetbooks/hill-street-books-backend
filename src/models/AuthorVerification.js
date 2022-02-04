import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AuthorVerificationSchema = new Schema({
  userId: {
    type: String
  },
  uniqueString: {
    type: String
  },
  createdAt: {
    type: Date
  },
  expiresAt: {
    type: Date
  }
});

const AuthorVerification = mongoose.model(
  'AuthorVerification',
  AuthorVerificationSchema
);

export { AuthorVerification };

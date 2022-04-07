import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isAdmin: { type: Boolean },
  verified: { type: Boolean },
  token: { type: String }
});

const Author = mongoose.model('Authors', AuthorSchema);

export { Author };

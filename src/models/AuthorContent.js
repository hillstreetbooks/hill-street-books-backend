import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CustomInput = {
  value: {
    type: String
  },
  error: {
    type: String
  }
};

const Books = {
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  publishedDate: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  bookCover: {
    type: String
  },
  isbn: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ageGroup: {
    type: String,
    required: true
  }
};

const AuthorDetails = {
  first_name: {
    type: CustomInput,
    required: true
  },
  last_name: {
    type: CustomInput,
    required: true
  },
  dob: {
    type: CustomInput,
    required: true
  },
  email: {
    type: CustomInput,
    required: true
  },
  display_picture: {
    type: CustomInput
  },
  website: {
    type: CustomInput,
    required: true
  },
  location: {
    type: CustomInput,
    required: true
  },
  biography: {
    type: CustomInput,
    required: true
  }
};

const SocialLinks = {
  facebook: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  pinterest: { type: String }
};

const AuthorContentSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  author_details: AuthorDetails,
  social_links: SocialLinks,
  books: [Books],
  videos: [CustomInput],
  isPublished: {
    type: Boolean,
    required: true
  },
  lastUpdated: {
    type: String,
    required: true
  }
});

const AuthorContent = mongoose.model('AuthorContent', AuthorContentSchema);

export { AuthorContent };

import Joi from 'joi';

const registrationScehma = Joi.object()
  .keys({
    username: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] }
      })
      .required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
        )
      )
      .message(
        'Password requirements are not met. Please hover (?) to check the requirements.'
      ),
    confirm_password: Joi.ref('password'),
    name: Joi.string().min(3).max(25).required()
  })
  .with('password', 'confirm_password');

const loginSchema = Joi.object().keys({
  username: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required(),
  password: Joi.string().required(),
  remainLoggedIn: Joi.boolean().required()
});

const fetchAuthorInfoSchema = Joi.object().keys({
  username: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required()
});

const updateAuthorInfoSchema = Joi.object().keys({
  username: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required(),
  name: Joi.string().required()
});

const forgotPasswordSchema = Joi.object().keys({
  username: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required()
});

const resetPasswordSchema = Joi.object().keys({
  userId: Joi.required(),
  uniqueString: Joi.string().required(),
  password: Joi.string()
    .pattern(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
    )
    .message(
      'Password requirements are not met. Please hover (?) to check the requirements.'
    ),
  confirm_password: Joi.ref('password')
});

const bookSchema = Joi.object().keys({
  title: Joi.string().required(),
  price: Joi.string().required(),
  publishedDate: Joi.string().required(),
  publisher: Joi.string().required(),
  isbn: Joi.string().required(),
  language: Joi.string().required(),
  bookCover: Joi.string(),
  description: Joi.string().required(),
  ageGroup: Joi.string().required()
});

const socialLinksSchema = Joi.object().keys({
  facebook: Joi.string().required(),
  instagram: Joi.string().required(),
  twitter: Joi.string().required(),
  pinterest: Joi.string().required()
});

const authorDetailsSchema = Joi.object().keys({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  dob: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required(),
  displayPicture: Joi.string().required(),
  website: Joi.string().required(),
  location: Joi.string().required(),
  biography: Joi.string().required()
});

const authorContentSchema = Joi.object().keys({
  username: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required(),
  // author_details: authorDetailsSchema,
  // social_links: socialLinksSchema,
  books: Joi.array().items(bookSchema)
});

export {
  authorContentSchema,
  fetchAuthorInfoSchema,
  forgotPasswordSchema,
  loginSchema,
  registrationScehma,
  resetPasswordSchema,
  updateAuthorInfoSchema
};

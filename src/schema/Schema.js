import Joi from 'joi';

const registrationScehma = Joi.object()
  .keys({
    username: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'ca'] }
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
    name: Joi.string().min(3).max(25).required(),
    isAdmin: Joi.boolean().required()
  })
  .with('password', 'confirm_password');

const loginSchema = Joi.object().keys({
  username: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ca'] }
    })
    .required(),
  password: Joi.string().required(),
  remainLoggedIn: Joi.boolean().required()
});

const fetchAuthorInfoSchema = Joi.object().keys({
  username: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ca'] }
    })
    .required()
});

const updateAuthorInfoSchema = Joi.object().keys({
  username: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ca'] }
    })
    .required(),
  name: Joi.string().required()
});

const forgotPasswordSchema = Joi.object().keys({
  username: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ca'] }
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

export {
  fetchAuthorInfoSchema,
  forgotPasswordSchema,
  loginSchema,
  registrationScehma,
  resetPasswordSchema,
  updateAuthorInfoSchema
};

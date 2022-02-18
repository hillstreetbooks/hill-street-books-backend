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

export { fetchAuthorInfoSchema, loginSchema, registrationScehma };

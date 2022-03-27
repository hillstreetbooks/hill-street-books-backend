import express from 'express';
import { verifyToken } from '../middleware/Auth.js';
import { validateParams } from '../middleware/Validators.js';
import { AuthorController } from '../controllers/author.controller.js';
import { AuthorContentController } from '../controllers/authorcontent.controller.js';
import {
  fetchAuthorInfoSchema,
  forgotPasswordSchema,
  loginSchema,
  registrationScehma,
  resetPasswordSchema,
  authorContentSchema,
  updateAuthorInfoSchema
} from '../schema/Schema.js';

const router = express.Router();
const AuthorControllerInstance = new AuthorController();
const AuthorContentControllerInstance = new AuthorContentController();

// AuthorController Routes
router.post(
  '/register-author',
  validateParams(registrationScehma, AuthorControllerInstance.registerAuthor)
);
router.get(
  '/author/verify/:userId/:uniqueString',
  AuthorControllerInstance.verifyAuthorEmail
);
router.post(
  '/login',
  validateParams(loginSchema, AuthorControllerInstance.authenticateUser)
);
router.post(
  '/fetch-author-info',
  verifyToken,
  validateParams(
    fetchAuthorInfoSchema,
    AuthorControllerInstance.fetchAuthorInfo
  )
);
router.post(
  '/update-author-info',
  verifyToken,
  validateParams(
    updateAuthorInfoSchema,
    AuthorControllerInstance.updateAuthorInfo
  )
);
router.post(
  '/forgot-password',
  validateParams(
    forgotPasswordSchema,
    AuthorControllerInstance.retrievePassword
  )
);
router.post(
  '/author/password-reset',
  validateParams(resetPasswordSchema, AuthorControllerInstance.resetPassword)
);
router.post(
  '/author/update-content',
  verifyToken,
  AuthorContentControllerInstance.updateContent
);
router.post(
  '/author/content',
  verifyToken,
  AuthorContentControllerInstance.fetchContent
);

export { router };

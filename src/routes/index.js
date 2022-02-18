import express from 'express';
import { verifyToken } from '../middleware/Auth.js';
import { validateParams } from '../middleware/Validators.js';
import { AuthorController } from '../controllers/author.controller.js';
import {
  fetchAuthorInfoSchema,
  forgotPasswordSchema,
  loginSchema,
  registrationScehma
} from '../schema/Schema.js';

const router = express.Router();
const AuthorControllerInstance = new AuthorController();

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
router.get(
  '/fetch-author-info',
  verifyToken,
  validateParams(
    fetchAuthorInfoSchema,
    AuthorControllerInstance.fetchAuthorInfo
  )
);
router.post(
  '/forgot-password',
  validateParams(
    forgotPasswordSchema,
    AuthorControllerInstance.retrievePassword
  )
);

export { router };

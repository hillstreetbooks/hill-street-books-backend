import express from 'express';

import { AuthorController } from '../controllers/author.controller.js';
const router = express.Router();

const AuthorControllerInstance = new AuthorController();

// AuthorController Routes
router.post('/register-author', AuthorControllerInstance.registerAuthor);
router.get(
  '/author/verify/:userId/:uniqueString',
  AuthorControllerInstance.verifyAuthorEmail
);

export { router };

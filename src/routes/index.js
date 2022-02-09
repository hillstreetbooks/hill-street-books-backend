import express from 'express';
import { verifyToken } from "./middleware/auth.js";
import { AuthorController } from '../controllers/author.controller.js';

const router = express.Router();
const AuthorControllerInstance = new AuthorController();

// AuthorController Routes
router.post('/register-author', AuthorControllerInstance.registerAuthor);
router.get(
  '/author/verify/:userId/:uniqueString',
  AuthorControllerInstance.verifyAuthorEmail
);
router.post('/login', AuthorControllerInstance.authenticateUser);
router.get("/fetch-author-info", verifyToken, AuthorControllerInstance.fetchAuthorInfo);

export { router };

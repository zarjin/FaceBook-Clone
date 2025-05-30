import express from 'express';
import {
  register,
  login,
  logout,
  cheakAuth,
} from '../controllers/auth.controller';
import isAuthorized from '../middlewares/isAuthorized';

const AuthRoutes = express.Router();

AuthRoutes.post('/register', register);
AuthRoutes.post('/login', login);
AuthRoutes.post('/logout', logout);
AuthRoutes.get('/cheak-auth', isAuthorized, cheakAuth);

export default AuthRoutes;

import express from 'express';
import {
  getUser,
  getOtherUser,
  updateUser,
  updateUserAvatar,
  updateUserCover,
} from '../controllers/user.controller';
import isAuthorized from '../middlewares/isAuthorized';
import { userUpload } from '../middlewares/upload.multer.cloudinary';

const UserRoutes = express.Router();

UserRoutes.get('/get-user', isAuthorized, getUser);
UserRoutes.get('/get-other-user/:userId', getOtherUser);
UserRoutes.put('/user', isAuthorized, updateUser);
UserRoutes.put(
  '/user/avatar',
  isAuthorized,
  userUpload.single('avatar'),
  updateUserAvatar
);
UserRoutes.put(
  '/user/cover',
  isAuthorized,
  userUpload.single('cover'),
  updateUserCover
);

export default UserRoutes;

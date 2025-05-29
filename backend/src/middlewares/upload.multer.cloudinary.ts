import multer from 'multer';
import cloudinary from '../configs/cloudinary.config';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const userStorage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'avatars',
    allowedFormats: ['jpg', 'png', 'jpeg'],
  }),
});

const postStorage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'posts',
    allowedFormats: ['jpg', 'png', 'jpeg'],
  }),
});

export const userUpload = multer({ storage: userStorage });
export const postUpload = multer({ storage: postStorage });

import express from 'express';
import {
  createPost,
  getPost,
  getAllPosts,
  likePost,
  commentPost,
} from '../controllers/post.controller';
import isAuthorized from '../middlewares/isAuthorized';
import { postUpload } from '../middlewares/upload.multer.cloudinary';

const PostRoutes = express.Router();

PostRoutes.post(
  '/create-post',
  isAuthorized,
  postUpload.single('image'),
  createPost
);
PostRoutes.get('/get-post/:postId', getPost);
PostRoutes.get('/get-all-posts', getAllPosts);
PostRoutes.put('/like-post/:postId', isAuthorized, likePost);
PostRoutes.put('/comment-post/:postId', isAuthorized, commentPost);

export default PostRoutes;

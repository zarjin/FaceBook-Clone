import { Request, Response } from 'express';
import userModels from '../models/user.models';
import postModels from '../models/post.models';

export const createPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as any).user.id;
    const { text } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const newPost = await postModels.create({
      user: userId,
      text,
      image: req.file?.path,
    });

    if (!newPost) {
      return res.status(400).json({ message: 'Post not created' });
    }

    await userModels.findByIdAndUpdate(userId, {
      $push: { yourPosts: newPost._id },
    });

    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create post' });
  }
};

export const getPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: 'Post does not exist' });
    }

    const post = await postModels.findById(postId);

    if (!post) {
      return res.status(400).json({ message: 'Post does not exist' });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to get post' });
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const posts = await postModels.find().populate('user').populate('likes');

    if (!posts) {
      return res.status(400).json({ message: 'Posts not found' });
    }
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to get posts' });
  }
};

export const likePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as any).user.id;
    const { postId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    if (!postId) {
      return res.status(400).json({ message: 'Post does not exist' });
    }

    const post = await postModels.findById(postId);

    if (!post) {
      return res.status(400).json({ message: 'Post does not exist' });
    }
    const Liked = post.likes.includes(userId);

    const updateOptions = Liked ? '$pull' : '$push';

    await postModels.findByIdAndUpdate(postId, {
      [updateOptions]: { likes: userId },
    });

    return res
      .status(200)
      .json(updateOptions === '$push' ? 'Liked' : 'Unliked');
  } catch (error) {
    return res.status(500).json({ message: 'Failed to like post' });
  }
};

export const commentPost = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = (req as any).user.id;
    const { postId } = req.params;
    const { comment } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    if (!postId) {
      return res.status(400).json({ message: 'Post does not exist' });
    }

    if (!comment) {
      return res.status(400).json({ message: 'Comment is required' });
    }

    const post = await postModels.findById(postId);

    if (!post) {
      return res.status(400).json({ message: 'Post does not exist' });
    }

    await postModels.findByIdAndUpdate(postId, {
      $push: { comments: comment },
    });

    return res.status(200).json({ message: 'Comment added' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to comment post' });
  }
};

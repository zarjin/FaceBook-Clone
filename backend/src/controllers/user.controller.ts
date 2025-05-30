import { Request, Response } from 'express';
import userModels from '../models/user.models';

export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as any).user.id;

    if (!userId) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const user = await userModels.findById(userId);

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: '  Failed to get user' });
  }
};

export const getOtherUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const user = await userModels.findById(userId);

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: '  Failed to get user' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as any).user.id;
    const { bio, location, work, education } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const user = await userModels.findByIdAndUpdate(
      userId,
      { bio, location, work, education },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: '  Failed to update user' });
  }
};

export const updateUserAvatar = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = (req as any).user.id;
    const { avatar } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const user = await userModels.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: '  Failed to update user' });
  }
};

export const updateUserCover = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = (req as any).user.id;
    const { cover } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const user = await userModels.findByIdAndUpdate(
      userId,
      { cover },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: '  Failed to update user' });
  }
};

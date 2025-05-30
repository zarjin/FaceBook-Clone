import userModels from '../models/user.models';
import { greateToken } from '../utils/jwt.utils';
import { hashPassword, comparePassword } from '../utils/bcrypt.utils';
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await userModels.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await hashPassword(password);

    if (!hashedPassword) {
      res.status(500).json({ message: 'Password not hashed' });
    }

    const newUser = await userModels.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = greateToken(String(newUser._id));

    if (!token) {
      res.status(500).json({ message: 'Token not generated' });
    }

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'none',
      secure: true,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = greateToken(String(user._id));

    if (!token) {
      res.status(500).json({ message: 'Token not generated' });
    }

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'none',
      secure: true,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Login failed' });
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Logout failed' });
  }
};

export const cheakAuth = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.status(200).json({ Authorized: true });
  } catch (error) {
    return res.status(500).json({ message: 'Unauthorized' });
  }
};

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';

const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default isAuthorized;

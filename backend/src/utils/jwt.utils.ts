import JWT from 'jsonwebtoken';

export const greateToken = (userId: string) => {
  return JWT.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string) => {
  return JWT.verify(token, process.env.JWT_SECRET as string);
};

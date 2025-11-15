import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // For development: check if we want to bypass auth
  if (process.env.NODE_ENV !== 'production') {
    console.log('Auth middleware: Development mode - bypassing authentication');
    return next();
  }

  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).send({ error: 'Authentication required.' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your-development-secret');
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).send({ error: 'Authentication required.' });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).send({ error: 'Authentication required.' });
  }
};

export default authMiddleware;

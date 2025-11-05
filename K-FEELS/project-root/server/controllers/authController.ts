import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Schema, model, Document, Types } from 'mongoose';


import dotenv from 'dotenv';
dotenv.config();

// --- Type Definitions ---
interface IUser extends Document {
  email: string;
  passwordHash: string;
}

interface UserResponse {
  id: string; 
  email: string;
}

interface AuthRequestBody {
  email: string;
  password: string;
}

interface JwtPayload {
  userId: string;
  email: string;
}

// --- Mongoose Model Definition ---

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});


UserSchema.virtual('id').get(function (this: IUser & { _id: Types.ObjectId }) {
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    const transformedRet = ret as { [key: string]: any }; 
    delete transformedRet._id;
    delete transformedRet.passwordHash;
    delete transformedRet.__v;
  },
});

const UserModel = model<IUser>('User', UserSchema);

// --- Global Setup (JWT_SECRET) ---

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// --- Controller Functions ---

export const register = async (req: Request<{}, {}, AuthRequestBody>, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password || password.length < 8) {
      return res.status(400).json({ error: 'Email is required and password must be at least 8 characters long.' });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(409).json({ error: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({ email, passwordHash });

    const token = jwt.sign({ userId: newUser.id, email: newUser.email } as JwtPayload, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, email: newUser.email } as UserResponse,
      token,
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request<{}, {}, AuthRequestBody>, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email } as JwtPayload, JWT_SECRET, { expiresIn: '7d' });

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: 'Login successful',
        user: { id: user.id, email: user.email } as UserResponse,
        token,
      });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out' });
};
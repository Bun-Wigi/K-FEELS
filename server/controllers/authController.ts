import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// --- User Schema ---
// This defines what a User looks like in the database

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

const UserModel = mongoose.model('User', UserSchema);

// --- Configuration ---

const JWT_SECRET: string = process.env.JWT_SECRET || 'your_jwt_secret_key';

// --- Controller Functions ---

// Register a new user
export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Step 1: Validate input
    if (!email || !password || password.length < 8) {
      return res.status(400).json({
        error: 'Email is required and password must be at least 8 characters long.',
      });
    }

    // Step 2: Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Step 3: Hash the password for security (never store plain passwords!)
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Step 4: Create new user in database
    const newUser: any = await UserModel.create({ email, passwordHash });

    // Step 5: Create JWT token for authentication
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Step 6: Send success response
    res.status(201).json({
      message: 'User registered successfully',
      user: { 
        id: newUser._id,
        email: newUser.email 
      },
      token,
      redirectTo: '/' // Add redirect URL
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Log in an existing user
export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    
    // Step 1: Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Step 2: Find user by email
    const user: any = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Step 3: Check if password matches
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Step 4: Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Step 5: Set token as HTTP-only cookie and send response
    res
      .cookie('token', token, {
        httpOnly: true,  // Can't be accessed by JavaScript (security)
        secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
        sameSite: 'strict',  // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days in milliseconds
      })
      .status(200)
      .json({
        message: 'Login successful',
        user: { 
          id: user._id,
          email: user.email 
        },
        token,
        redirectTo: '/' // Add redirect URL
      });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Log out a user
export const logout = (_req: Request, res: Response) => {
  // Clear the authentication cookie
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out' });
};

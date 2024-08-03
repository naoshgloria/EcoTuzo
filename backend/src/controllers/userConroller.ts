import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users); // Ensure an array is returned
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const approveUser = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id)
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error approving user' });
  }
};

export const rejectUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting user' });
  }
};

import { Request, Response } from 'express';
import Shop from '../models/shop';
import Redeem from '../models/redeemModel';



export const createRedeemRequest = async (req: Request, res: Response) => {
  try {
    const { userId, shopId, bottles, points } = req.body;

    const redeemRequest = new Redeem({ userId, shopId, bottles, points });
    await redeemRequest.save();

    console.log('Admin notified of new redemption request:', redeemRequest);

    res.status(201).json(redeemRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating redemption request' });
  }
};





export const rejectRedeemRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const redeemRequest = await Redeem.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });

    if (!redeemRequest) {
      return res.status(404).json({ message: 'Redemption request not found' });
    }

    res.json(redeemRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting redemption request' });
  }
};

import mongoose, { Schema, Document } from 'mongoose';

export interface IRedeem extends Document {
  userId: string;
  shopId: string;
  bottles: number;
  points: number;
  status: 'pending' | 'approved' | 'rejected';
}

const redeemSchema: Schema = new Schema({
  userId: { type: String, required: true },
  shopId: { type: String, required: true },
  bottles: { type: Number, required: true },
  points: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, {
  timestamps: true
});

export default mongoose.model<IRedeem>('Redeem', redeemSchema);

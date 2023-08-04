import mongoose from 'mongoose';
import { UserDocument } from './user.model';
import { DeviceDocument } from './device.model';

export interface PersoanlTransactionDocument extends mongoose.Document {
  userId: UserDocument['_id'];
  
  title: string;
  description: string;
  type: string;
  amount: Number;
  totalAmount: Number;
  isActive: Number;
  createdAt: Date;
  updatedAt: Date;
}

const PersoanlTransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: { type: Date, required: true },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    totalAmount: { type: Number, required: false },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null }
  },
  { timestamps: true }
);

export const PersoanlTransaction = mongoose.model<PersoanlTransactionDocument>(
  'PersoanlTransaction',
  PersoanlTransactionSchema
);

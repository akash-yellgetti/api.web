import mongoose from 'mongoose';
import { UserDocument } from './user.model';
import { DeviceDocument } from './device.model';

export interface TransactionDocument extends mongoose.Document {
  userId: UserDocument['_id'];
  title: string;
  description: string;
  data: [Object];
  isActive: Number;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    data: { type: [Object], required: true },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null }
  },
  { timestamps: true }
);

export const Transaction = mongoose.model<TransactionDocument>(
  'Transaction',
  TransactionSchema
);

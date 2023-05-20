import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface NotificationeDocument extends mongoose.Document {
    title: string;
    description: string;
    recipient: UserDocument["_id"];
    read: number;
    createdAt: Date;
    updatedAt: Date;
}

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  read: { type: Number, default: 0 },
  createdBy: { type: String, default: null },
  updatedBy: { type: String, default: null },
},
{ timestamps: true }
);

export const Notification = mongoose.model<NotificationeDocument>("notification", NotificationSchema);
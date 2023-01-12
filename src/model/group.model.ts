import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface GroupDocument extends mongoose.Document {
  name: string;
  
  isActive: Number,
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
  },
  { timestamps: true }
);

export const Group = mongoose.model<GroupDocument>("Group", GroupSchema);

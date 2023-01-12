import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface DeviceDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  model: string;
  os: string;
  version: string;
  token: string;
  isActive: Number,
  createdAt: Date;
  updatedAt: Date;
}

const DeviceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    model: { type: String },
    os: { type: String },
    version: { type: String },
    token: { type: String },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
  },
  { timestamps: true }
);

export const Device = mongoose.model<DeviceDocument>("Device", DeviceSchema);

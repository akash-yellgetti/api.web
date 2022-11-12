import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface DeviceDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  model: string;
  os: string;
  version: string;
  token: string;
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
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Device = mongoose.model<DeviceDocument>("Device", DeviceSchema);

export default Device;
import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface DeviceDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const DeviceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true }
);

const Device = mongoose.model<DeviceDocument>("Session", DeviceSchema);

export default Device;
import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface DeviceDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  device: string;
  deviceType: string;
  os: string;
  version: string;
  token: string;
  data: Object;
  isActive: Number,
  createdAt: Date;
  updatedAt: Date;
}

const DeviceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    device: { type: String, required: true},
    deviceType: { type: String, required: true},
    os: { type: String },
    version: { type: String },
    token: { type: String },
    data: { type: Object , required: true },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
  },
  { timestamps: true }
);

DeviceSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

export const Device = mongoose.model<DeviceDocument>("Device", DeviceSchema);

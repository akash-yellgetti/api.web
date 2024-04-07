import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { DeviceDocument } from "./device.model";

export interface SocketDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  socketId: string;
  deviceId: DeviceDocument["_id"];
  isActive: Number,
  createdAt: Date;
  updatedAt: Date;
};

const SocketSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    socketId: { type: String, required: true },
    deviceId: { type: String, default: null },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
  },
  { timestamps: true }
);


SocketSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});


SocketSchema.virtual("device", {
  ref: "Device",
  localField: "deviceId",
  foreignField: "_id",
  justOne: true,
});

export const Socket = mongoose.model<SocketDocument>("Socket", SocketSchema);

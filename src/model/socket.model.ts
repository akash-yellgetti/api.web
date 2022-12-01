import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { DeviceDocument } from "./device.model";

export interface SocketDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  deviceId: DeviceDocument["_id"];
  socketId: string;
  isActive: Boolean;
};

const SocketSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deviceId: { type: String, default: null },
    socketId: { type: String },
    isActive: { type: Number, default: 1 }
  },
  { timestamps: true }
);

export const Socket = mongoose.model<SocketDocument>("Socket", SocketSchema);

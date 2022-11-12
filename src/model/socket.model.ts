import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { DeviceDocument } from "./device.model";

export interface ScoketDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  deviceId: DeviceDocument["_id"];
  socketId: string;
};

const SocketSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deviceId: { type: String, default: null },
    socketId: { type: String }
  },
  { timestamps: true }
);

const Session = mongoose.model<SessionDocument>("Session", SocketSchema);

export default Session;
import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface MessageDocument extends mongoose.Document {
  typeId: { type: String };
  type: { type: String },
  text: { type: String },
  conversationId: { type: String },
  isActive: Number,
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new mongoose.Schema(
  {
    typeId: { type: mongoose.Schema.Types.ObjectId, required: true },
    type: { type: String, required: true },
    text: { type: String, required: true },
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
  },
  { timestamps: true }
);

export const Message = mongoose.model<MessageDocument>("Message", MessageSchema);

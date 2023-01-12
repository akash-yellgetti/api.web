import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface ConversationDocument extends mongoose.Document {
  type: { type: String },
  typeId: { type: String },
  isActive: Number,
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    typeId: { type: mongoose.Schema.Types.ObjectId, required: true },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
  },
  { timestamps: true }
);

export const Conversation = mongoose.model<ConversationDocument>("Conversation", ConversationSchema);

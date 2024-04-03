import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface ConversationMessageDocument extends mongoose.Document {
  conversationId: { type: String },
  userId: { type: String };
  type: { type: String },
  text: { type: String },
  isActive: Number,
  createdAt: Date;
  updatedAt: Date;
}

const ConversationMessageSchema = new mongoose.Schema(
  {
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    text: { type: String, required: true },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
  },
  { timestamps: true }
);

ConversationMessageSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

ConversationMessageSchema.virtual("conversation", {
  ref: "Conversation",
  localField: "conversationId",
  foreignField: "_id",
  justOne: true,
});


export const ConversationMessage = mongoose.model<ConversationMessageDocument>("ConversationMessage", ConversationMessageSchema);

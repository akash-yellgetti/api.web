import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface ConversationMemberDocument extends mongoose.Document {
  conversationId: { type: String }, // self user id
  userId: { type: String }, // Conversation member individual
  isActive: Number,
  createdAt: Date;
  updatedAt: Date;
}

const ConversationMemberSchema = new mongoose.Schema(
  {
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
  },
  { timestamps: true }
);

ConversationMemberSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

ConversationMemberSchema.virtual("conversation", {
  ref: "Conversation",
  localField: "conversationId",
  foreignField: "_id",
  justOne: true,
});


export const ConversationMember = mongoose.model<ConversationMemberDocument>("ConversationMember", ConversationMemberSchema);

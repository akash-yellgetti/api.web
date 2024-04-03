import mongoose from "mongoose";

export interface ConversationMessageStatusDocument extends mongoose.Document {
  conversationMessageId: { type: String },
  conversationId: { type: String },
  userId: { type: String };
  type: { type: String },
  isActive: Number,
  createdAt: Date;
  updatedAt: Date;
}


// Types
// Delivered
// Read
const ConversationMessageStatusSchema = new mongoose.Schema(
  {
    conversationMessageId: { type: mongoose.Schema.Types.ObjectId, ref: "ConversationMessage", required: true },
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
  },
  { timestamps: true }
);

ConversationMessageStatusSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

ConversationMessageStatusSchema.virtual("conversation", {
  ref: "Conversation",
  localField: "conversationId",
  foreignField: "_id",
  justOne: true,
});

ConversationMessageStatusSchema.virtual("message", {
    ref: "ConversationMessage",
    localField: "conversationMessageId",
    foreignField: "_id",
    justOne: true,
  });


export const ConversationMessageStatus = mongoose.model<ConversationMessageStatusDocument>("ConversationMessageStatus", ConversationMessageStatusSchema);

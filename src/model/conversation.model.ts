import mongoose from "mongoose";

export interface ConversationDocument extends mongoose.Document {
  type: { type: String },
  name: { type: String },
  isActive: Number,
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    name: { type: String, required: false },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
  },
  { timestamps: true }
);

ConversationSchema.virtual("members", {
  ref: "ConversationMember",
  localField: "_id",
  foreignField: "conversationId",
  justOne: false,
});

ConversationSchema.virtual("messages", {
  ref: "ConversationMessage",
  localField: "_id",
  foreignField: "conversationId",
  justOne: false,
});

export const Conversation = mongoose.model<ConversationDocument>("Conversation", ConversationSchema);

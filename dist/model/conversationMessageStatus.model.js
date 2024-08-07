"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationMessageStatus = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Types
// Delivered
// Read
const ConversationMessageStatusSchema = new mongoose_1.default.Schema({
    conversationMessageId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "ConversationMessage", required: true },
    conversationId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Conversation", required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
}, { timestamps: true });
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
exports.ConversationMessageStatus = mongoose_1.default.model("ConversationMessageStatus", ConversationMessageStatusSchema);

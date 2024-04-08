"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ConversationSchema = new mongoose_1.default.Schema({
    type: { type: String, required: true },
    name: { type: String, required: false },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
}, { timestamps: true });
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
exports.Conversation = mongoose_1.default.model("Conversation", ConversationSchema);

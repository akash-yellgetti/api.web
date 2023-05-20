"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationMessage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ConversationMessageSchema = new mongoose_1.default.Schema({
    conversationId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Conversation", required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    text: { type: String, required: true },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
}, { timestamps: true });
exports.ConversationMessage = mongoose_1.default.model("ConversationMessage", ConversationMessageSchema);

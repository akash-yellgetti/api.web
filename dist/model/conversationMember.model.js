"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationMember = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ConversationMemberSchema = new mongoose_1.default.Schema({
    conversationId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Conversation", required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
}, { timestamps: true });
exports.ConversationMember = mongoose_1.default.model("ConversationMember", ConversationMemberSchema);

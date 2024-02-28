"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const NotificationSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    recipient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    read: { type: Number, default: 0 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
}, { timestamps: true });
exports.Notification = mongoose_1.default.model("notification", NotificationSchema);

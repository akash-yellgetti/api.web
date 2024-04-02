"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ContactSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    dob: { type: Date, required: false },
    gender: { type: String, required: false },
    mobileNo: { type: Number, required: true, unique: true },
    email: { type: String, required: false, unique: false, trim: true, lowercase: true },
    avatar: { type: String, required: false },
    avatareBackground: { type: String, required: false },
    isActive: { type: Number, default: 1 },
    createdBy: { type: Number, default: null },
    updatedBy: { type: Number, default: null },
    deletedBy: { type: Number, default: null },
}, { timestamps: true });
exports.Contact = mongoose_1.default.model("Contact", ContactSchema);

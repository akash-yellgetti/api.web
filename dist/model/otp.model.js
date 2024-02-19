"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const OtpSchema = new mongoose_1.default.Schema({
    mobileNo: { type: Number, required: true },
    no: { type: Number, required: true },
    type: { type: String, required: true },
    try: { type: Number, default: 0 },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
}, { timestamps: true });
exports.Otp = mongoose_1.default.model("Otp", OtpSchema);

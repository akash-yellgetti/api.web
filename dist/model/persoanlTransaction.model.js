"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersoanlTransaction = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PersoanlTransactionSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: { type: Date, required: true },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    totalAmount: { type: Number, required: false },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null }
}, { timestamps: true });
exports.PersoanlTransaction = mongoose_1.default.model('PersoanlTransaction', PersoanlTransactionSchema);

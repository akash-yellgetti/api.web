"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Budget = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BudgetSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true },
    isActive: { type: Number, default: 1 },
    createdBy: { type: Number, default: null },
    updatedBy: { type: Number, default: null },
    deletedBy: { type: Number, default: null },
}, { timestamps: true });
BudgetSchema.virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true,
});
exports.Budget = mongoose_1.default.model("Budget", BudgetSchema);

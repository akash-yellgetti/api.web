"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Planner = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PlannerSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    budgetId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Budget", required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    principalAmount: { type: Number, required: true },
    amount: { type: Number, required: true },
    rate: { type: Number, required: true },
    tenure: { type: Number, required: true },
    data: { type: Object },
    isActive: { type: Number, default: 1 },
    createdBy: { type: Number, default: null },
    updatedBy: { type: Number, default: null },
    deletedBy: { type: Number, default: null },
}, { timestamps: true });
PlannerSchema.virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true,
});
PlannerSchema.virtual("budget", {
    ref: "Budget",
    localField: "budgetId",
    foreignField: "_id",
    justOne: true,
});
exports.Planner = mongoose_1.default.model("Planner", PlannerSchema);

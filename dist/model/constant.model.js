"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constant = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ConstantSchema = new mongoose_1.default.Schema({
    column: { type: String },
    code: { type: String },
    value: { type: String },
    desc: { type: String },
    isActive: { type: Number, default: 1 },
    createdBy: { type: Number, default: null },
    updatedBy: { type: Number, default: null },
    deletedBy: { type: Number, default: null }
}, { timestamps: true });
ConstantSchema.virtual("subdata", {
    ref: "Constant",
    localField: "code",
    foreignField: "column",
    justOne: false,
});
exports.Constant = mongoose_1.default.model('Constant', ConstantSchema);

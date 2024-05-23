"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CategoriesSchema = new mongoose_1.default.Schema({
    parentCode: { type: String, default: null },
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
}, { timestamps: true });
CategoriesSchema.virtual("subcategories", {
    ref: "Categories",
    localField: "code",
    foreignField: "parentCode",
    justOne: false,
});
exports.Categories = mongoose_1.default.model("Categories", CategoriesSchema);

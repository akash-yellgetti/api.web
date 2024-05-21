import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { setting } from "../config/setting";

export interface CategoriesDocument extends mongoose.Document {
    parentId: string;
    code: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    isActive: string;
}

const CategoriesSchema = new mongoose.Schema(
  {
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Categories", required: true, default: 0 },
    code: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
  },
  { timestamps: true }
);

export const Categories = mongoose.model<CategoriesDocument>("Categories", CategoriesSchema);

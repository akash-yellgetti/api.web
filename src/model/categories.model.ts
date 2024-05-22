import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { setting } from "../config/setting";

export interface CategoriesDocument extends mongoose.Document {
    parentCode: string;
    code: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    isActive: string;
}

const CategoriesSchema = new mongoose.Schema(
  {
    parentCode: { type: String,  default: null },
    code: { type: String, required: true, unique: true },
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

CategoriesSchema.virtual("subcategories", {
  ref: "Categories",
  localField: "code",
  foreignField: "parentCode",
  justOne: false,
});

export const Categories = mongoose.model<CategoriesDocument>("Categories", CategoriesSchema);

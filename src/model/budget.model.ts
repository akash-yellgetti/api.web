import mongoose from "mongoose";

export interface BudgetDocument extends mongoose.Document {
  userId: string;
  isActive: number;
  createdBy: number;
  updatedBy: number;
  deletedBy?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const BudgetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
    isActive: { type: Number, default: 1 },
    createdBy: { type: Number, default: null },
    updatedBy: { type: Number, default: null },
    deletedBy: { type: Number, default: null },
  },
  { timestamps: true }
);

BudgetSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});


export const budget = mongoose.model<BudgetDocument>("Budget", BudgetSchema);

import mongoose from "mongoose";

export interface PlannerDocument extends mongoose.Document {
  userId: string;
  budgetId: string;
  type: string;
  title: string;
  description: string;
  principalAmount: number;
  amount: number; //LOAN AMOUNT REMAINING
  rate: number; //CURRENT INTEREST RATE
  tenure: number; //TENURE REMAINING
  data: object; // save all the data in object format
  isActive: number;
  createdBy: number;
  updatedBy: number;
  deletedBy?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const PlannerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    budgetId: { type: mongoose.Schema.Types.ObjectId, ref: "Budget", required: true },
    type: { type: String, required: true},
    title: { type: String, required: true},
    description: { type: String },
    principalAmount: { type: Number, required: true},
    amount: { type: Number, required: true},
    rate: { type: Number, required: true},
    tenure: { type: Number, required: true},
    data: { type: Object },
    isActive: { type: Number, default: 1 },
    createdBy: { type: Number, default: null },
    updatedBy: { type: Number, default: null },
    deletedBy: { type: Number, default: null },
  },
  { timestamps: true }
);



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


export const Planner = mongoose.model<PlannerDocument>("Planner", PlannerSchema);

import mongoose from "mongoose";

export interface PlannerDocument extends mongoose.Document {
  userId: string;
  type: string;
  title: string;
  description: string;
  amount: number;
  rate: number;
  tenure: number;
  data: object;
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
    type: { type: String, required: true},
    title: { type: String, required: true},
    description: { type: String },
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

export const Planner = mongoose.model<PlannerDocument>("Planner", PlannerSchema);

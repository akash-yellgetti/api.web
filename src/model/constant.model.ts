import mongoose from 'mongoose';

export interface ConstantDocument extends mongoose.Document {
  column: string;
  code: string;
  value: string;
  desc: string;
  isActive: number;
  createdBy: number;
  updatedBy: number;
  deletedBy?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const ConstantSchema = new mongoose.Schema(
  {
    column: { type: String },
    code: { type: String },
    value: { type: String },
    desc: { type: String },
    isActive: { type: Number, default: 1 },
    createdBy: { type: Number, default: null },
    updatedBy: { type: Number, default: null },
    deletedBy: { type: Number, default: null }
  },
  { timestamps: true }
);

ConstantSchema.virtual("subdata", {
  ref: "Constant",
  localField: "code",
  foreignField: "column",
  justOne: false,
});


export const Constant = mongoose.model<ConstantDocument>('Constant',ConstantSchema);

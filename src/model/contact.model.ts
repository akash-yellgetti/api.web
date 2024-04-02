import mongoose from "mongoose";

export interface ContactDocument extends mongoose.Document {
  userId: string;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  mobileNo: string;
  email: string;
  avatar: string,
  createdBy: number;
  updatedBy: number;
  deletedBy?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const ContactSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    dob: { type: Date, required: false },
    gender: { type: String, required: false },
    mobileNo: { type: Number, required: true, unique: true },
    email: { type: String, required: false, unique: false, trim: true, lowercase: true },
    avatar: { type: String, required: false },
    avatareBackground: { type: String, required: false },
    isActive: { type: Number, default: 1 },
    createdBy: { type: Number, default: null },
    updatedBy: { type: Number, default: null },
    deletedBy: { type: Number, default: null },
  },
  { timestamps: true }
);

export const Contact = mongoose.model<ContactDocument>("Contact", ContactSchema);

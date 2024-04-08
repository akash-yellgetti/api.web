import mongoose from "mongoose";
import { user } from "../route";
const Schema = mongoose.Schema;
// const Document = mongoose.Document;

export interface UserDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  mobileNo: string;
  email: string;
  password: string;
  avatar: string,
  avatareBackground?: string,
  Active: number;
  createdBy: number;
  updatedBy: number;
  deletedBy?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    mobileNo: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    avatareBackground: { type: String, required: false },
    isActive: { type: Number, default: 1 },
    createdBy: { type: Number, default: null },
    updatedBy: { type: Number, default: null },
    deletedBy: { type: Number, default: null },
  },
  { timestamps: true }
);

UserSchema.virtual("contacts", {
  ref: "Contact",
  localField: "_id",
  foreignField: "userId",
  justOne: false,
});

UserSchema.virtual("sockets", {
  ref: "Socket",
  localField: "_id",
  foreignField: "userId",
  justOne: false,
});

export const User = mongoose.model<UserDocument>("User", UserSchema);

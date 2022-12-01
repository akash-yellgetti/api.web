import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { setting } from "../config/setting";

export interface OtpDocument extends mongoose.Document {
    mobileNo: number;
    no: number;
    type: string;
    try: number;
    isActive: number;
}

const OtpSchema = new mongoose.Schema(
  {
    mobileNo: { type: Number, required: true },
    no: { type: Number, required: true },
    type: { type: String, required: true },
    try: { type: Number, default: 0 },
    isActive: { type: Number, default: 1 }
  },
  { timestamps: true }
);

export const Otp = mongoose.model<OtpDocument>("Otp", OtpSchema);

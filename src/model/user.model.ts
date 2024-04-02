import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { setting } from "../config/setting";
import uniqueValidator from 'mongoose-unique-validator';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

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
  createdBy: number;
  updatedBy: number;
  deletedBy?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const UserSchema = new mongoose.Schema(
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

export const User = mongoose.model<UserDocument>("User", UserSchema);

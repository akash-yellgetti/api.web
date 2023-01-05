import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { setting } from "../config/setting";
import uniqueValidator from 'mongoose-unique-validator';

export interface UserDocument extends mongoose.Document {
  first_name: string;
  last_name: string;
  dob: Date;
  gender: string;
  mobileNo: Number;
  email: string;
  password: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    mobileNo: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, required: false },
    profilePictureBackground: { type: String, required: false },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

// UserSchema.pre("save", async function (next: any) {
//   let user = this as UserDocument;

//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified("password")) return next();

//   // Random additional data
//   const salt = await bcrypt.genSalt(setting["saltWorkFactor"]);

//   const hash = await bcrypt.hashSync(user.password, salt);

//   // Replace the password with the hash
//   user.password = hash;

//   return next();
// });


UserSchema.methods.uniqueMobileNo = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

// Used for logging in
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

export const User = mongoose.model<UserDocument>("User", UserSchema);

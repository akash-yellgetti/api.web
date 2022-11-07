import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { setting } from "../config/setting";

export interface UserDocument extends mongoose.Document {
  first_name: string;
  last_name: string;
  dob: Date;
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
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
  },
  { timestamps: true }
);

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

// Used for logging in
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
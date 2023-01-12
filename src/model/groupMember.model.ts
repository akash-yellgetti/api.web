import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { GroupDocument } from "./group.model";

export interface GroupMemberDocument extends mongoose.Document {
  groupId: GroupDocument["_id"];
  userId: UserDocument["_id"];
  isActive: Number,
  createdAt: Date;
  updatedAt: Date;
}

const GroupMemberSchema = new mongoose.Schema(
  {
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
  },
  { timestamps: true }
);

export const GroupMember = mongoose.model<GroupMemberDocument>("GroupMember", GroupMemberSchema);

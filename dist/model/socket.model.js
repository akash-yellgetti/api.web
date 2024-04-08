"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
;
const SocketSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    socketId: { type: String, required: true },
    deviceId: { type: String, default: null },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
}, { timestamps: true });
SocketSchema.virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true,
});
SocketSchema.virtual("device", {
    ref: "Device",
    localField: "deviceId",
    foreignField: "_id",
    justOne: true,
});
exports.Socket = mongoose_1.default.model("Socket", SocketSchema);

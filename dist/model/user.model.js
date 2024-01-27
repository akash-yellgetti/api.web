"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
// export interface UserDocument extends UserInterface {
const UserSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
UserSchema.plugin(mongoose_unique_validator_1.default);
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
UserSchema.methods.uniqueMobileNo = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        return bcrypt_1.default.compare(candidatePassword, user.password).catch((e) => false);
    });
};
// Used for logging in
UserSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        return bcrypt_1.default.compare(candidatePassword, user.password).catch((e) => false);
    });
};
exports.User = mongoose_1.default.model("User", UserSchema);

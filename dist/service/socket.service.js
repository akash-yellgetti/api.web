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
exports.socketService = void 0;
const model_service_1 = require("./model.service");
const model_1 = require("../model");
const mongoose_1 = __importDefault(require("mongoose"));
class SocketService extends model_service_1.Model {
    constructor() {
        super(model_1.Socket);
        this.hidden = ['__v', 'createdBy', 'updatedBy'];
        this.populate = ['user', 'device'];
        this.updateSocketRecord = (data) => __awaiter(this, void 0, void 0, function* () {
            const user = data.user;
            const where = { userId: new mongoose_1.default.Types.ObjectId(user._id), deviceId: user.deviceId };
            const record = yield this.readOne(where);
            if (record) {
                yield this.update(where, { isActive: 0 });
            }
            yield exports.socketService.create({
                userId: data.user._id,
                socketId: data.user.userSocketId,
                deviceId: data.user.deviceId,
            });
        });
    }
}
exports.socketService = new SocketService();

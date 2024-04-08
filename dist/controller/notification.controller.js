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
exports.NotificationController = void 0;
const service_1 = require("../service");
const utils_1 = require("../utils");
const socket_1 = require("../config/socket");
const notification_service_1 = require("../service/notification.service");
const mongoose_1 = __importDefault(require("mongoose"));
class Notification {
    constructor() {
        this.send = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            utils_1.log.info('controller.socket.list');
            try {
                const notification = yield notification_service_1.notificationService.create({
                    title: inputs.title,
                    description: inputs.description,
                    recipient: inputs.recipient
                });
                const userSocket = yield service_1.socketService.readOne({ userId: new mongoose_1.default.Types.ObjectId(inputs.recipient), isActive: 1 });
                if (userSocket && userSocket.socketId) {
                    socket_1.socket.getIO().getSocketIO().to(userSocket.socketId).emit("notification", { eventName: 'notification', eventTo: userSocket.socketId, data: notification });
                }
                return new utils_1.Api(response).success().code(200).send({ data: notification });
            }
            catch (e) {
                utils_1.log.error(e.message, e);
                return new utils_1.Api(response).error().code(400).send(e);
            }
        });
        this.list = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.session.list');
            try {
                const data = yield notification_service_1.notificationService.read({ recipient: new mongoose_1.default.Types.ObjectId(user._id) });
                return new utils_1.Api(response).success().code(200).send({ data });
            }
            catch (e) {
                utils_1.log.error(e.message, e);
                return new utils_1.Api(response).error().code(400).send(e);
            }
        });
    }
}
exports.NotificationController = new Notification();

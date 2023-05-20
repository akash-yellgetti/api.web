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
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketIO = void 0;
const logger_util_1 = require("./logger.util");
class SocketService {
    constructor() {
        this.connection = null;
        this.connected = () => {
            logger_util_1.log.info('Socket connect');
        };
        this.disconnect = () => {
            logger_util_1.log.error('Socket Disconnect', this.connection.id);
        };
        this.join = () => { };
        this.leave = () => { };
        this.message = () => { };
        this.ping = () => { };
        this.reconnect = () => { };
    }
}
const socketService = new SocketService();
const socketIO = (socket) => {
    socket.on("connected", (data) => __awaiter(void 0, void 0, void 0, function* () {
        socket.join("main-channel");
        // socket.join("notification-channel");
    }));
    setInterval(function () {
        // socket
        socket.to("main-channel").emit("notification", { title: "Sample Notification" + new Date().getTime() });
    }, 20 * 1000);
    // socket.emit("noti")
    socket.on("disconnect", (data) => __awaiter(void 0, void 0, void 0, function* () {
    }));
    socket.on("join", (data) => __awaiter(void 0, void 0, void 0, function* () {
    }));
    socket.on("leave", (data) => __awaiter(void 0, void 0, void 0, function* () {
    }));
};
exports.socketIO = socketIO;

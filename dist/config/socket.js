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
exports.socket = void 0;
const socket_io_1 = require("socket.io");
const service_1 = require("../service");
const lodash_1 = __importDefault(require("lodash"));
class SocketEvent {
    constructor() {
        this.users = {};
        this.set = (socket) => {
            this.socket = socket;
            // this.users[socket.id] = '';
            // socketService.in
        };
        this.setIo = (io) => {
            this.io = io;
        };
        this.all = (name, data) => {
            this.io.emit(name, data);
        };
        this.specific = (toId, name, data) => {
            this.io.to(toId).emit(name, data);
        };
        this.specificself = (socket, name, data) => {
            socket.emit(name, data);
        };
        this.connection = (socket) => __awaiter(this, void 0, void 0, function* () {
            console.log('new user connection', socket.id);
            this.set(socket);
            socket.emit('userSocketId', socket.id);
            // socket.emit("users", this.users);
            socket.on('connected', this.connected);
            socket.on('join', this.join);
            socket.on('send', this.send);
            socket.on('disconnect', () => {
                this.disconnect(socket);
            });
        });
        this.publishUsers = (socket, functionName = 'No Name') => __awaiter(this, void 0, void 0, function* () {
            const users = yield service_1.socketService.read({ isActive: 1 });
            console.log(users);
            const user = lodash_1.default.find(users, { socketId: socket.id });
            console.log(functionName, user);
            this.io.emit('onlineUsers', { userId: user === null || user === void 0 ? void 0 : user.userId, users });
        });
        this.connected = (data) => __awaiter(this, void 0, void 0, function* () {
            // console.log('Event: Connected');
            // console.log('data', data);
            yield service_1.socketService.updateSocketRecord(data);
            this.publishUsers(this.socket, 'connected');
            // const socketRecord = await this.
            // socketService.update({
            //   userId: data.user._id,
            //   socketId: data.user.userSocketId,
            //   deviceId: data.user.deviceId,
            // });
        });
        this.join = ({ channels }) => __awaiter(this, void 0, void 0, function* () {
            // console.table(channels);
            console.log(channels);
            for (const i in channels) {
                const room = channels[i];
                console.log(this.socket.id, room);
                this.socket.join(room);
            }
        });
        this.send = (res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Event send', res);
            // switch (res.eventName) {
            //   case 'chat.message.receive':
            //     conversationMessageService.create({
            //       conversationId: res.conversationId,
            //       userId: res.userId,
            //       type: res.data.type,
            //       text: res.data.text
            //     });
            //     break;
            //   default:
            //     break;
            // }
            res.eventTo
                ? this.io.to(res.eventTo).emit(res.eventName, res)
                : this.io.emit(res.eventName, res);
        });
        this.disconnect = (socket) => __awaiter(this, void 0, void 0, function* () {
            delete this.users[socket.id];
            yield service_1.socketService.update({ socketId: socket.id }, { isActive: 0 });
            this.publishUsers(socket, 'disconnected');
        });
    }
    // tslint:disable-next-line
    static getInstance() {
        if (!SocketEvent.instance) {
            SocketEvent.instance = new SocketEvent();
        }
        return SocketEvent.instance;
    }
}
const socketEvent = SocketEvent.getInstance();
class Socket {
    constructor() {
        this.initiate = (server) => {
            const options = {
                allowedHeaders: [
                    'Origin',
                    'X-Requested-With',
                    'Content-Type',
                    'Accept',
                    'X-Access-Token',
                    'Authorization'
                ],
                credentials: true,
                methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
                origin: '*',
                preflightContinue: false
            };
            const io = new socket_io_1.Server(server, {
                cors: options
            });
            this.io = io;
            socketEvent.setIo(io);
            this.io.on('connection', socketEvent.connection);
        };
    }
    // tslint:disable-next-line
    static getInstance() {
        if (!Socket.instance) {
            Socket.instance = new Socket();
        }
        return Socket.instance;
    }
}
exports.socket = Socket.getInstance();

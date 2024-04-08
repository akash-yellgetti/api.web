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
exports.socket = void 0;
const socket_io_1 = require("socket.io");
const service_1 = require("../service");
class Socket {
    constructor() {
        this.connection = (socket) => __awaiter(this, void 0, void 0, function* () {
            // socket.emit('connected', 'connected');
            this.emitToOne(socket.id, 'getUserDetails', { socketId: socket.id });
            socket.on('userStatusChange', this.userStatusChange);
            socket.on('getUserStatus', (data) => {
                this.getUserStatus(data, socket);
            });
            socket.on('join', this.join);
            socket.on('leave', this.leave);
            socket.on('send', this.send);
            socket.on('disconnect', () => this.disconnect(socket.id));
            // Listen for user online status changes
            // socket.on('userStatusChange', ({ userId, online }) => {
            //   socket.broadcast.emit('userStatusChange', { userId, online });
            // });
        });
        this.send = (data) => __awaiter(this, void 0, void 0, function* () {
            console.log('user send', data);
        });
        this.userStatusChange = (data) => __awaiter(this, void 0, void 0, function* () {
            console.log('userStatusChange', data);
            yield service_1.socketService.create({ userId: data.user._id, socketId: data.socketId, deviceId: data.deviceId });
            this.getIO().emit('userStatusChange', { userId: data.user._id, online: true });
        });
        this.getUserStatus = (data, socket) => __awaiter(this, void 0, void 0, function* () {
            console.log('getUserStatus', data);
            const user = yield service_1.socketService.readOne({ userId: data.userId, isActive: 1 });
            const online = user ? true : false;
            socket.emit('userStatusChange', { userId: data.userId, online });
        });
        this.join = (data) => __awaiter(this, void 0, void 0, function* () {
            console.log('user join', data);
        });
        this.leave = (data) => __awaiter(this, void 0, void 0, function* () {
            console.log('user leave', data);
        });
        this.disconnect = (socketId) => __awaiter(this, void 0, void 0, function* () {
            console.log('user disconnected', socketId);
            // await socketService.hardDelete({ socketId: socketId });
            const user = yield service_1.socketService.readOne({ socketId: socketId, isActive: 1 });
            this.getIO().emit('userStatusChange', { userId: user.userId, online: false });
            yield service_1.socketService.softDelete({ socketId: socketId }, { isActive: 0 });
        });
        this.emitToOne = (id, eventName, eventData) => {
            this.io.to(id).emit(eventName, eventData);
        };
        this.io = null;
        this.initializeSocket();
    }
    initializeSocket() {
        // Initialize socket.io server
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
        const io = new socket_io_1.Server({
            cors: options
        });
        // Handle connection event
        io.on('connection', this.connection);
        this.io = io;
    }
    static getInstance() {
        if (!Socket.instance) {
            Socket.instance = new Socket();
        }
        return Socket.instance;
    }
    getIO() {
        return this.io;
    }
}
exports.socket = Socket.getInstance();

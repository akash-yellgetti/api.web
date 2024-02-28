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
var SocketEvents;
(function (SocketEvents) {
    // room events
    SocketEvents["JoinSocket"] = "join-socket";
    SocketEvents["leaveSocket"] = "leave-socket";
})(SocketEvents || (SocketEvents = {}));
const socketIO = (socket) => {
    console.log('a user connected');
    socket.on('join.mainChannel', (data) => __awaiter(void 0, void 0, void 0, function* () {
        socket.joinRoom;
    }));
    socket.on('join.notificationChannel', (data) => __awaiter(void 0, void 0, void 0, function* () {
    }));
    // console.log(app.getSocketIO())
    // socket.on(SocketEvents.JoinSocket, async (data: any) => {
    //   await socketService.update({ socketId: socket.id }, { userId: data.userId });
    //   const users = await socketService.read({ isActive: true });
    //   app.getSocketIO().sockets.emit('users', users);
    // })
    // socket.on('chat.message', async (data: any) => {
    //   console.log(data)
    //   const user: any = await socketService.readOne({ userId: data.userId, isActive: true });
    //   console.log(user)
    //   console.log('chat.message', data.message);
    //   // io.emit('chat message', msg);
    //   socket.to(user.socketId).emit({ scoketId: socket.id, message: data.message  });
    // });
    // socket.on('disconnect', () => {
    //   console.log('user disconnected');
    //   socketService.softDelete({ socketId: socket.id }, { isActive: false });
    // });
};
exports.socketIO = socketIO;

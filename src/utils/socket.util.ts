
import { socketService } from "../service/socket.service";
import { app } from '../config/app';



enum SocketEvents {
  // room events
  JoinSocket = 'join-socket',
  leaveSocket = 'leave-socket',

}

export const socketIO = (socket: any) => {
  console.log('a user connected');

  // console.log(app.getSocketIO())

  socket.on(SocketEvents.JoinSocket, async (data: any) => {
    await socketService.update({ socketId: socket.id }, { userId: data.userId });
    const users = await socketService.read({ isActive: true });
    app.getSocketIO().sockets.emit('users', users);
  })
  
  socket.on('chat.message', async (data: any) => {
    console.log(data)
    const user: any = await socketService.readOne({ userId: data.userId, isActive: true });
    console.log(user)
    console.log('chat.message', data.message);
    // io.emit('chat message', msg);
    socket.to(user.socketId).emit({ scoketId: socket.id, message: data.message  });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    socketService.softDelete({ socketId: socket.id }, { isActive: false });
  });
}

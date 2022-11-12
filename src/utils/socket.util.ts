
import { socketService } from "../service/socket.service";

export enum SocketEvents {
  // room events
  JoinSocket = 'join-socket',
  leaveSocket = 'leave-socket',

}

export const socketIO = (socket: any) => {
  console.log('a user connected');

  socket.on(SocketEvents.JoinSocket, (data: any) => {
    socketService.create( { userId: data.userId, socketId: socket.id } );
  })
  
  // socket.on('chat message', (msg: any) => {
  //   console.log('chat message', msg);
  //   // io.emit('chat message', msg);
  // });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    socketService.softDelete({ socketId: socket.id }, { isActive: false });
  });
}

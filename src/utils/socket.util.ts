export const socketIO = (socket: any) => {
  console.log('a user connected');

  socket.on('chat message', (msg: any) => {
    console.log('chat message', msg);
    // io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
}

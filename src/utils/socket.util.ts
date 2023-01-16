import { app } from '../config/app';
import { socket } from '../route';
import { log } from './logger.util';

class SocketService {
  private connection: any = null;

  connected = () => {
    log.info('Socket connect');
  };

  disconnect = () => {
    log.error('Socket Disconnect', this.connection.id);
  };

  join = () => {};

  leave = () => {};

  message = () => {};

  ping = () => {};

  reconnect = () => {};
}

const socketService = new SocketService();



export const socketIO = (socket: any) => {


  
  socket.on("connected", async (data: any) => {
    socket.join("main-channel");
    // socket.join("notification-channel");
  })

  setInterval(function () { 
    // socket
    socket.to("main-channel").emit("notification", { title: "Sample Notification"+ new Date().getTime() });
  }, 20 * 1000);
  

  // socket.emit("noti")

  socket.on("disconnect", async (data: any) => {
    
  })

  socket.on("join", async (data: any) => {
    
  })

  socket.on("leave", async (data: any) => {
    
  })

};

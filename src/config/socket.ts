import { Server } from "socket.io";


class SocketEvent {
  private static instance: SocketEvent;
  private io: any;
  private socket: any;
  private users: any = {};

  // tslint:disable-next-line
  public static getInstance(): SocketEvent {
      if (!SocketEvent.instance) {
          SocketEvent.instance = new SocketEvent();
      }

      return SocketEvent.instance;
  }

  set = (socket: any) => {
    this.users[socket.id] = '';
  }
  setIo = (io: any) => {
    this.io = io;
  }

  all = (name: string, data: any) => {
    this.io.emit(name, data);
  }

  specific = (toId: string, name: string, data: any) => {
    this.io.to(toId).emit(name, data);
  }

  specificself = (socket: any, name: string, data: any) => {
    socket.emit(name, data);
  }

  connection = async (socket: any) => {
    console.log('new user connection', socket.id);

    this.set(socket);
    socket.emit('userSocketId', socket.id)
    this.publishUsers(socket);

    // socket.emit("users", this.users);
    socket.on("connected", this.connected);
    socket.on("join", this.join);
    socket.on("send", this.send);
    socket.on("disconnect", () => {
      this.disconnect(socket);
    });
  }

  publishUsers = async (socket: any) => {
    this.io.emit("users", this.users);
  }

  connected = async (data: any) => {
    console.log('Event online');
    console.log(data);
  }

  join = async (data: any) => {
      
  }

  send = async (data: any) => {
    console.log('Event send');
    data.eventTo ? this.io.to(data.eventTo).emit(data.eventName, data) : this.io.emit(data.eventName, data);
  }

  disconnect = async (socket: any) => {
    delete this.users[socket.id];
    this.publishUsers(socket);
  }
}

const socketEvent = SocketEvent.getInstance();

class Socket {
  private static instance: Socket;
  private io: any;

  // tslint:disable-next-line
  public static getInstance(): Socket {
      if (!Socket.instance) {
          Socket.instance = new Socket();
      }

      return Socket.instance;
  }

  initiate = (server: any) => {
    const options: any = {
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: '*',
      preflightContinue: false,
    };
    const io = new Server(server, {
      cors: options
    });
    this.io = io;
    socketEvent.setIo(io);
    this.io.on('connection', socketEvent.connection)
  }
}

export const socket = Socket.getInstance();
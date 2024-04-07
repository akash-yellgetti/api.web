import { Server } from 'socket.io';
import { socketService, userService } from '../service';
import { user } from '../route';

class Socket {
  private static instance: any;
  private io: any;
  constructor() {
    this.io = null;
    this.initializeSocket();
  }

  initializeSocket() {
    // Initialize socket.io server
    const options: any = {
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
    const io = new Server({
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

  connection = async (socket: any) => {
    // socket.emit('connected', 'connected');
    this.emitToOne(socket.id, 'getUserDetails', { socketId: socket.id });
    socket.on('online', this.online);
    socket.on('join', this.join);
    socket.on('leave', this.leave);
    socket.on('send', this.send);
    socket.on('disconnect', this.disconnect);
  }

  send = async (data: any) => {
    console.log('user send', data);
  }
  
  online = async (data: any) => {
    console.log('user online', data);
    await socketService.create({ userId: data.user._id, socketId: data.socketId, deviceId: data.deviceId });
  }

  offline = async (data: any) => {
    console.log('user offline', data);
  }

  join = async (data: any) => {
    console.log('user join', data);
  }

  leave = async (data: any) => {
    console.log('user leave', data);
  }

  disconnect = async () => {
    console.log('user disconnected');
  }

  emitToOne = (id: string, eventName: string, eventData: any) => {
    this.io.to(id).emit(eventName, eventData);
  }
}

export const socket = Socket.getInstance();

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
    socket.on('userStatusChange', this.userStatusChange);
    socket.on('getUserStatus', (data: any) => { 
      this.getUserStatus(data, socket)
    });
    socket.on('join', this.join);
    socket.on('leave', this.leave);
    socket.on('send', this.send);
    socket.on('disconnect', () => this.disconnect(socket.id));
    // Listen for user online status changes
    // socket.on('userStatusChange', ({ userId, online }) => {
    //   socket.broadcast.emit('userStatusChange', { userId, online });
    // });
  }

  send = async (data: any) => {
    console.log('user send', data);
  }
  
  userStatusChange = async (data: any) => {
    console.log('userStatusChange', data);
    await socketService.create({ userId: data.user._id, socketId: data.socketId, deviceId: data.deviceId });
    this.getIO().emit('userStatusChange', { userId: data.user._id, online: true });
  }

  getUserStatus = async (data: any, socket: any) => {
    console.log('getUserStatus', data);
    const user: any = await socketService.readOne({ userId: data.userId, isActive: 1});
    const online = user ? true : false;
    socket.emit('userStatusChange', { userId: data.userId, online });
  }

  join = async (data: any) => {
    console.log('user join', data);
  }

  leave = async (data: any) => {
    console.log('user leave', data);
  }

  disconnect = async (socketId: string) => {
    console.log('user disconnected', socketId);
    // await socketService.hardDelete({ socketId: socketId });
    const user: any = await socketService.readOne({ socketId: socketId, isActive: 1});
    this.getIO().emit('userStatusChange', { userId: user.userId, online: false });
    await socketService.softDelete({ socketId: socketId }, { isActive: 0 });
  }

  emitToOne = (id: string, eventName: string, eventData: any) => {
    this.io.to(id).emit(eventName, eventData);
  }
}

export const socket = Socket.getInstance();

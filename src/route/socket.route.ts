import { SocketController } from '../controller';
import { Router } from 'express';
export const socket = Router();

socket.get('/list', SocketController.list)

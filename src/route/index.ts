import { Router } from 'express';
export const router = Router();
import auth from './auth.route';
import socket from './socket.route';

router.use('/auth', auth);
router.use('/socket', socket);


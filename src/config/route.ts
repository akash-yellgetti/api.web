import { auth, socket, user, moneyControl } from '../route';
import { Router } from 'express';
export const route = Router();

route.use('/auth', auth);
route.use('/socket', socket);
route.use('/user', user);
route.use('/money-control', moneyControl);
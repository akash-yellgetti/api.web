import { auth, socket, user, moneyControl, group, conversation, notification, personalTransaction } from '../route';
import { Router } from 'express';
export const route = Router();

route.use('/auth', auth);
route.use('/socket', socket);
route.use('/user', user);
route.use('/money-control', moneyControl);
route.use('/group', group);
route.use('/conversation', conversation);
route.use('/notification', notification);
route.use('/personal/transaction', personalTransaction);
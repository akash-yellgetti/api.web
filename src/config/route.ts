import {
  auth,
  socket,
  user,
  contact,
  moneyControl,
  group,
  conversation,
  notification,
  transaction,
  fyers,
  tradingview,
  device,
  budget,
  planner,
  categories
} from '../route';
import { Router } from 'express';
export const route = Router();

route.use('/auth', auth);
route.use('/socket', socket);
route.use('/user', user);
route.use('/contact', contact);
route.use('/money-control', moneyControl);
route.use('/group', group);
route.use('/conversation', conversation);
route.use('/notification', notification);
route.use('/transaction', transaction);
route.use('/fyers', fyers);
route.use('/tradingview', tradingview);
route.use('/device', device);
route.use('/budget', budget);
route.use('/planner', planner);
route.use('/categories', categories);

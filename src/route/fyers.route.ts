import { Router } from 'express';
import { FyersController } from '../controller';
export const fyers = Router();


fyers.post('/webhook',  FyersController.webhook);
fyers.get('/auth-code',  FyersController.getAuthCode);
fyers.get('/access-token',  FyersController.getAccessToken);
fyers.post('/access-token',  FyersController.getAccessToken);
fyers.get('/profile',  FyersController.getProfile);
fyers.get('/history',  FyersController.getHistoricalData);
fyers.get('/orders',  FyersController.getOrders);
fyers.get('/positions',  FyersController.getPositions);
fyers.get('/order/place',  FyersController.orderPlace);
fyers.post('/order/place',  FyersController.orderPlace);


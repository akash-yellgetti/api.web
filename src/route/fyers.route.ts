import { Router } from 'express';
import { FyersController } from '../controller';
export const fyers = Router();



fyers.get('/auth-code',  FyersController.getAuthCode);
fyers.get('/access-token',  FyersController.getAccessToken);
fyers.post('/access-token',  FyersController.getAccessToken);
fyers.get('/profile',  FyersController.getProfile);


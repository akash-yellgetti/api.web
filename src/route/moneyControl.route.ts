import { Router } from 'express';
import multer from 'multer';
import { MoneyControlController } from '../controller';
import { auth } from '../middleware';
export const moneyControl = Router();



moneyControl.post('/candles', auth,  MoneyControlController.getCandleData);


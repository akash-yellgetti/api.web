import { Router } from 'express';
import multer from 'multer';
import { MoneyControlController } from '../controller';
import { auth } from '../middleware';
export const moneyControl = Router();



moneyControl.get('/app',  MoneyControlController.app);
moneyControl.post('/option-chain',  MoneyControlController.optionChain);
moneyControl.post('/search',  MoneyControlController.search);
moneyControl.post('/details',  MoneyControlController.details);
moneyControl.post('/candles',  MoneyControlController.getCandleData);
moneyControl.post('/peaks',  MoneyControlController.getPeaks);


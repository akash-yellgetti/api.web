import { Router } from 'express';
import { TradingviewController } from '../controller';
export const tradingview = Router();


tradingview.post('/webhook',  TradingviewController.webhook);
tradingview.get('/webhook/logs',  TradingviewController.webhookLogs);



import { Router } from 'express';
import { validateRequest } from "../middleware";
import { TradingviewController } from '../controller';
import { tradingviewRequest } from "../schema";
export const tradingview = Router();


tradingview.get('/app',  TradingviewController.app);
tradingview.post('/webhook', validateRequest(tradingviewRequest.webhook), TradingviewController.webhook);
tradingview.get('/webhook/logs',  TradingviewController.webhookLogs);
tradingview.post('/webhook/logs',  TradingviewController.webhookLogs);



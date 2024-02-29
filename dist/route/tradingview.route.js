"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradingview = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
exports.tradingview = (0, express_1.Router)();
exports.tradingview.post('/webhook', controller_1.TradingviewController.webhook);
exports.tradingview.get('/webhook/logs', controller_1.TradingviewController.webhookLogs);

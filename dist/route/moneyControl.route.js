"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moneyControl = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
exports.moneyControl = (0, express_1.Router)();
exports.moneyControl.post('/search', controller_1.MoneyControlController.search);
exports.moneyControl.post('/details', controller_1.MoneyControlController.details);
exports.moneyControl.post('/candles', controller_1.MoneyControlController.getCandleData);
exports.moneyControl.post('/peaks', controller_1.MoneyControlController.getPeaks);
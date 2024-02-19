"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fyers = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
exports.fyers = (0, express_1.Router)();
exports.fyers.get('/auth-code', controller_1.FyersController.getAuthCode);
exports.fyers.get('/access-token', controller_1.FyersController.getAccessToken);
exports.fyers.post('/access-token', controller_1.FyersController.getAccessToken);
exports.fyers.get('/profile', controller_1.FyersController.getProfile);

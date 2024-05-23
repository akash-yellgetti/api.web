"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const route_1 = require("../route");
const express_1 = require("express");
exports.route = (0, express_1.Router)();
exports.route.use('/auth', route_1.auth);
exports.route.use('/socket', route_1.socket);
exports.route.use('/user', route_1.user);
exports.route.use('/contact', route_1.contact);
exports.route.use('/money-control', route_1.moneyControl);
exports.route.use('/group', route_1.group);
exports.route.use('/conversation', route_1.conversation);
exports.route.use('/notification', route_1.notification);
exports.route.use('/personal/transaction', route_1.personalTransaction);
exports.route.use('/fyers', route_1.fyers);
exports.route.use('/tradingview', route_1.tradingview);
exports.route.use('/device', route_1.device);
exports.route.use('/budget', route_1.budget);
exports.route.use('/planner', route_1.planner);
exports.route.use('/categories', route_1.categories);

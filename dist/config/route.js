"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const route_1 = require("../route");
const express_1 = require("express");
exports.route = (0, express_1.Router)();
exports.route.use('/auth', route_1.auth);
exports.route.use('/socket', route_1.socket);
exports.route.use('/user', route_1.user);
exports.route.use('/money-control', route_1.moneyControl);
exports.route.use('/group', route_1.group);
exports.route.use('/conversation', route_1.conversation);
exports.route.use('/notification', route_1.notification);

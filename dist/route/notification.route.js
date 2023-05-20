"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notification = void 0;
const controller_1 = require("../controller");
const express_1 = require("express");
exports.notification = (0, express_1.Router)();
exports.notification.post('/send', controller_1.NotificationController.send);

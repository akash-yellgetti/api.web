"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notification = void 0;
const controller_1 = require("../controller");
const express_1 = require("express");
const middleware_1 = require("../middleware");
exports.notification = (0, express_1.Router)();
exports.notification.post('/send', middleware_1.auth, controller_1.NotificationController.send);
exports.notification.get('/list', middleware_1.auth, controller_1.NotificationController.list);

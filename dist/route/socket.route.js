"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const controller_1 = require("../controller");
const express_1 = require("express");
exports.socket = (0, express_1.Router)();
exports.socket.get('/list', controller_1.SocketController.list);

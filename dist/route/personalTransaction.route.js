"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalTransaction = void 0;
const controller_1 = require("../controller");
const middleware_1 = require("../middleware");
const express_1 = require("express");
exports.personalTransaction = (0, express_1.Router)();
exports.personalTransaction.post('/create', middleware_1.auth, controller_1.PersonalTransactionController.create);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transaction = void 0;
const controller_1 = require("../controller");
const middleware_1 = require("../middleware");
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
exports.transaction = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
exports.transaction.post('/create', middleware_1.auth, upload.any(), controller_1.TransactionController.create);
exports.transaction.post('/list', middleware_1.auth, controller_1.TransactionController.list);

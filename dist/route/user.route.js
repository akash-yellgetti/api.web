"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const controller_1 = require("../controller");
const middleware_1 = require("../middleware");
exports.user = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
exports.user.post('/profile/picture', middleware_1.auth, upload.any(), controller_1.UserController.profilePicture);
exports.user.post('/profile/update', middleware_1.auth, upload.any(), controller_1.UserController.update);
exports.user.get('/detail', middleware_1.auth, controller_1.UserController.detail);

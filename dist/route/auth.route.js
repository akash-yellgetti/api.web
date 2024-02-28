"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth_controller_1 = require("../controller/auth.controller");
const express_1 = require("express");
const middleware_1 = require("../middleware");
const middleware_2 = require("../middleware");
const schema_1 = require("../schema");
exports.auth = (0, express_1.Router)();
exports.auth.post('/otp/generate', (0, middleware_2.validateRequest)(schema_1.authRequest.generateOTP), auth_controller_1.AuthController.generateOTP);
exports.auth.post('/otp/verify', (0, middleware_2.validateRequest)(schema_1.authRequest.verifyOTP), auth_controller_1.AuthController.verifyOTP);
exports.auth.post('/register', (0, middleware_2.validateRequest)(schema_1.authRequest.register), auth_controller_1.AuthController.register);
exports.auth.post('/login', (0, middleware_2.validateRequest)(schema_1.authRequest.login), auth_controller_1.AuthController.login);
exports.auth.get('/check', middleware_1.auth, auth_controller_1.AuthController.check);

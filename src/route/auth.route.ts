import { AuthController } from '../controller/auth.controller'
import { Router } from 'express';
import { auth as authenicate } from '../middleware';

import { validateRequest } from "../middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "../schema/user.schema";
import { authRequest } from "../schema";

export const auth = Router();
auth.post('/otp/generate', validateRequest(authRequest.generateOTP), AuthController.generateOTP)
auth.post('/otp/verify', validateRequest(authRequest.verifyOTP), AuthController.verifyOTP)
auth.post('/register', validateRequest(authRequest.register), AuthController.register)
auth.post('/login', validateRequest(authRequest.login), AuthController.login)
auth.get('/check', authenicate, AuthController.check)

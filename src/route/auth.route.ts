import { AuthController } from '../controller/auth.controller'
import { Router } from 'express';


import { validateRequest } from "../middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "../schema/user.schema";

export const auth = Router();
auth.post('/otp/generate', AuthController.generateOTP)
auth.post('/otp/verify', AuthController.verifyOTP)
auth.post('/register', validateRequest(createUserSchema), AuthController.register)
auth.post('/login', AuthController.login)

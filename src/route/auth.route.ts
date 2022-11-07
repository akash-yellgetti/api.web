import { Router } from 'express';
const router = Router();
import { AuthController } from '../controller/auth.controller'

import { validateRequest } from "../middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "../schema/user.schema";


router.post('/otp/generate', AuthController.generateOTP)
router.post('/otp/verify', AuthController.verifyOTP)
router.post('/register', validateRequest(createUserSchema), AuthController.register)
router.post('/login', AuthController.login)

export default router;
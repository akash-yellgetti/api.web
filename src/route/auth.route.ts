import { Router } from 'express';
const router = Router();
import { AuthController } from '../controller/auth.controller'


router.post('otp/generate', AuthController.generateOTP)
router.post('otp/verify', AuthController.verifyOTP)
router.post('register', AuthController.register)
router.post('/login', AuthController.login)

export default router;
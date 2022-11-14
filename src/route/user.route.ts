import { UserController } from '../controller';
import { Router } from 'express';
import { auth } from '../middleware';
export const user = Router();

user.get('/detail', auth, UserController.detail)

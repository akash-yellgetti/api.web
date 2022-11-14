import { UserController } from '../controller';
import { Router } from 'express';
export const user = Router();

user.get('/detail', UserController.detail)

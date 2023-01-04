import { Router } from 'express';
import multer from 'multer';
import { UserController } from '../controller';
import { auth } from '../middleware';
export const user = Router();

const upload = multer({ storage: multer.memoryStorage() });
user.post('/profile/picture', auth,  upload.any(), UserController.profilePicture);
user.post('/profile/update', auth,  upload.any(), UserController.update);
user.get('/detail', auth, UserController.detail);

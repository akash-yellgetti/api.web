import { Router } from 'express';
import multer from 'multer';
import { ContactController } from '../controller';
import { auth } from '../middleware';
export const contact = Router();

contact.post('/create', auth, ContactController.create);
contact.get('/detail', auth, ContactController.detail);
contact.get('/list', auth, ContactController.list);
contact.get('/refresh', auth, ContactController.refresh);

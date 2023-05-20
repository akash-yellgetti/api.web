import { NotificationController } from '../controller';
import { Router } from 'express';
import { auth } from '../middleware';
export const notification = Router();

notification.post('/send', auth, NotificationController.send);
notification.get('/list', auth, NotificationController.list);

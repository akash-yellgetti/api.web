import { NotificationController } from '../controller';
import { Router } from 'express';
export const notification = Router();

notification.post('/send', NotificationController.send)

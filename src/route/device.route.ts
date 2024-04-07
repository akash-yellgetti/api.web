import { Router } from 'express';
import multer from 'multer';
import { DeviceController } from '../controller';
import { auth } from '../middleware';
export const device = Router();

device.get('/detail', auth, DeviceController.detail);
device.post('/create', auth, DeviceController.create);
device.get('/list', auth, DeviceController.list);

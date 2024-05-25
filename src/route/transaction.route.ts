import { TransactionController } from '../controller';
import { auth } from '../middleware';
import { Router } from 'express';
import multer from 'multer';
export const transaction = Router();

const upload = multer({ storage: multer.memoryStorage() });
transaction.post('/create', auth, upload.any(), TransactionController.create)
transaction.post('/list', auth, TransactionController.list)

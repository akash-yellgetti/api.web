import { PersonalTransactionController } from '../controller';
import { auth } from '../middleware';
import { Router } from 'express';
export const personalTransaction = Router();

personalTransaction.post('/create', auth, PersonalTransactionController.create)


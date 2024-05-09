import { Router } from 'express';
import multer from 'multer';
import { BudgetController } from '../controller';
import { auth } from '../middleware';
export const budget = Router();

budget.post('/create', auth, BudgetController.create);
budget.post('/bulk/create', auth, BudgetController.bulkCreate);
budget.post('/delete', auth, BudgetController.delete);
budget.get('/list', auth, BudgetController.list);
budget.get('/detail', auth, BudgetController.list);

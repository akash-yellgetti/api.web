import { Router } from 'express';
import multer from 'multer';
import { BudgetController } from '../controller';
import { auth, validateRequest } from '../middleware';
import { budgetRequest } from '../schema';
export const budget = Router();

budget.post('/create', auth, validateRequest(budgetRequest.create), BudgetController.create);
budget.post('/bulk/create', auth, BudgetController.bulkCreate);
budget.post('/delete', auth, BudgetController.delete);
budget.get('/list', auth, BudgetController.list);
budget.get('/detail', auth, BudgetController.list);

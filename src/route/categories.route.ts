import { Router } from 'express';
import multer from 'multer';
import { CategoriesController } from '../controller';
import { auth } from '../middleware';
export const categories = Router();

categories.post('/create', auth, CategoriesController.create);
categories.post('/bulk/create', auth, CategoriesController.bulkCreate);
// categories.post('/delete', auth, CategoriesController.delete);
categories.get('/list', auth, CategoriesController.list);
categories.post('/list', auth, CategoriesController.list);
categories.post('/detail', auth, CategoriesController.detail);

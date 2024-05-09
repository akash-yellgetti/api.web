import { Router } from 'express';
import multer from 'multer';
import { PlannerController } from '../controller';
import { auth } from '../middleware';
export const planner = Router();
 
planner.post('/create', auth, PlannerController.create);
planner.post('/bulk/create', auth, PlannerController.bulkCreate);
planner.post('/delete', auth, PlannerController.delete);
planner.get('/list', auth, PlannerController.list);
planner.get('/detail', auth, PlannerController.list);

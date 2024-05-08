import { Router } from 'express';
import multer from 'multer';
import { PlannerController } from '../controller';
import { auth } from '../middleware';
export const planner = Router();

// planner.get('/detail', auth, PlannerController.detail);
// planner.post('/create', auth, PlannerController.create);
planner.get('/list', auth, PlannerController.list);


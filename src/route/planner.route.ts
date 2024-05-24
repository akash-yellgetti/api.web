import { Router } from 'express';
import { PlannerController } from '../controller';
import { auth, validateRequest } from '../middleware';
import { plannerRequest } from '../schema';
export const planner = Router();
 
planner.post('/create', auth, validateRequest(plannerRequest.create), PlannerController.create);
planner.post('/bulk/create', auth, PlannerController.bulkCreate);
planner.post('/delete', auth, PlannerController.delete);
planner.get('/list', auth, PlannerController.list);
planner.get('/detail', auth, PlannerController.list);

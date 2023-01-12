
import { Router } from 'express';
import { auth as authenicate } from '../middleware';

import { validateRequest } from "../middleware";
import { groupRequest } from "../schema";

import { GroupController } from '../controller'

export const group = Router();

group.post('/create', authenicate, validateRequest(groupRequest.create), GroupController.create);
group.post('/update', authenicate, validateRequest(groupRequest.update), GroupController.update);

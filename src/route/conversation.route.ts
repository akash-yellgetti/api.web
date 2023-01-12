
import { Router } from 'express';
import { auth as authenicate } from '../middleware';

import { validateRequest } from "../middleware";
import { conversationRequest } from "../schema";

import { ConversationController } from '../controller'

export const conversation = Router();

conversation.post('/create', authenicate, validateRequest(conversationRequest.create), ConversationController.create);



import { Router } from 'express';
import { auth as authenicate } from '../middleware';

import { validateRequest } from "../middleware";
import { conversationRequest } from "../schema";

import { ConversationController } from '../controller'

export const conversation = Router();

conversation.post('/create', authenicate, validateRequest(conversationRequest.create), ConversationController.create);
conversation.post('/list', authenicate, validateRequest(conversationRequest.list), ConversationController.list);
conversation.get('/list', authenicate, ConversationController.list);
conversation.post('/history', authenicate, validateRequest(conversationRequest.history), ConversationController.history);


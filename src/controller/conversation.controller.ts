import * as express from 'express';
import { conversationService, conversationMemberService, conversationMessageService } from "../service";
import { Api, api, log } from '../utils';
import _ from 'lodash';
import { ConversationMessage } from '../model';
import mongoose from 'mongoose';

class Conversation {

  list = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    const user = request.user;
    log.info('controller.auth.check');
    try {
      const userIds = [user._id, inputs.typeId];
      let data: any = await conversationMemberService.aggregate([
        { $match :  { userId: new mongoose.Types.ObjectId(user._id)  } },
         
        {
          $lookup:
            {
              from: "conversations",
              localField: "conversationId",
              foreignField: "_id",
              as: "conversationDetail"
            }
        }
      ]);
      
      const payload = { data, message: 'conversation list.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  }

  history = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    const user = request.user;
    log.info('controller.auth.check');
    try {
      let conversationMessages: any = await conversationMessageService.read({ conversationId: inputs.id });
      const payload = { data:  conversationMessages, message: 'conversation history.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  }
    
  create = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    const user = request.user;
    log.info('controller.auth.check');
    try {
      const userIds = [user._id, inputs.typeId];
      let conversation: any = await conversationMemberService.getConversation(userIds);
      if(Object.keys(conversation).length === 0) {
        conversation = await conversationMemberService.createConversation({  typeId: inputs.typeId, type: inputs.type, userId: user._id, createdBy: user._id, updatedBy: user._id }, user);
      }
      const conversationMessage = await conversationMessageService.create({ userId: user._id, type: inputs.data.type, text: inputs.data.text, conversationId: conversation._id, createdBy: user._id, updatedBy: user._id });
      const payload = { data: { conversation, message: conversationMessage }, message: 'conversation created successfully.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  }
}

export const ConversationController = new Conversation();
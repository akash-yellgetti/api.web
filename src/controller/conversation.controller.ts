import * as express from 'express';
import { conversationService, conversationMemberService, conversationMessageService } from "../service";
import { Api, api, log } from '../utils';
import _ from 'lodash';

class Conversation {
    
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
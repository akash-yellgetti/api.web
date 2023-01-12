import * as express from 'express';
import { conversationService, messageService } from "../service";
import { Api, api, log } from '../utils';
import _ from 'lodash';

class Conversation {
    
  create = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    const user = request.user;
    log.info('controller.auth.check');
    try {
      let conversation: any = await conversationService.readOne({ typeId: inputs.typeId, userId: user._id  });
      if(Object.keys(conversation).length === 0) {
        conversation = await conversationService.create({  typeId: inputs.typeId, type: inputs.type, userId: user._id, createdBy: user._id, updatedBy: user._id });
      }
      const message = await messageService.create({ typeId: inputs.typeId, type: inputs.data.type, text: inputs.data.text, conversationId: conversation._id, createdBy: user._id, updatedBy: user._id });
      const payload = { data: { conversation, message }, message: 'conversation created successfully.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      return new Api(response).error().code(200).send(e);
    }
  }
}

export const ConversationController = new Conversation();
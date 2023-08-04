import * as express from 'express';
import { conversationMemberService, conversationService } from "../service";
import { Api, api, log } from '../utils';
import _ from 'lodash';
import { group } from 'console';

class PersonalFinance {
    
    create = async (request: any, response: express.Response) => {
        const inputs: any = _.pick({ ...request.body, ...request.params}, ['name', 'members']);
        const name: string = inputs && inputs.name ? inputs.name : '';
        const user = request.user;
        log.info('controller.User.detail');
        try {
          const conversation: any = await conversationService.create({ type: 'group', name, createdBy: user._id, updatedBy: user._id });
          const conversationMembers = await conversationMemberService.addUsers(inputs.members, conversation._id, user._id);
          const payload = { code: 200,  data:  { group: conversation, groupMembers: conversationMembers }, message: 'Group created.' };
          return new Api(response).success().code(200).send(payload);
        } catch (e: any) {
          log.error(e.message, e);
          return new Api(response).error().code(400).send(e);
        }
    }

    update = async (request: any, response: express.Response) => {
      const inputs: any = _.pick({ ...request.body, ...request.params}, ['name']);
      const name: string = inputs && inputs.name ? inputs.name+"-"+new Date().getTime() : '';
      const user = request.user;
      log.info('controller.User.detail');
      try {
        const group: any = await conversationService.updateOne({ name, updatedBy: user._id }, { _id: inputs.id });
  
        const payload = { code: 200,  data:  group, message: 'Group created.' };
        return new Api(response).success().code(200).send(payload);
      } catch (e) {
        log.error( e);
        return new Api(response).error().code(200).send(e);
      }
  }
}

export const PersonalFinanceController = new PersonalFinance();